import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/providers/endpoints/endpoints.provider';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { GameManager } from '../../../shared/game-manager';
import { QuizItem } from '../types/quantum-quiz-item.type';
import { QuizResponse } from '../types/quantum-quiz-response.type';

@Injectable()
export class QuizManagerService extends GameManager {
  private endpoints = inject(ENDPOINTS);
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  /**
   * The amount of cash won by the player.
   */
  public wonCash = signal(0);

  /**
   * The error message generated during quiz generation.
   */
  public generateErrorMsg = signal('');

  /**
   * The list of quiz questions.
   */
  public questions = signal<QuizItem[]>([]);

  /**
   * The current level of the game.
   */
  public level = signal(0);

  /**
   * The current state of the game.
   * Possible values are 'pending', 'correct', or 'wrong'.
   */
  public state = signal<'pending' | 'correct' | 'wrong'>('pending');

  /**
   * The list of cash amounts for each level of the game.
   */
  public readonly cashList = [
    1_000_000, 500_000, 125_000, 64_000, 32_000, 16_000, 8_000, 4_000, 2_000,
    1_000, 500, 300, 200, 100, 50,
  ];

  /**
   * Indicates if the quiz generation is active.
   */
  public generatingQuestions = false;

  public topic = signal('');

  public destroyQuizGeneration$ = new Subject<void>();

  constructor() {
    super();
    if (this.isBrowser) {
      this.wakeUpQuizFunction();
    }
  }

  override destroy() {
    super.destroy();
    this.destroyQuizGeneration$.next();
  }

  /**
   * Performs the wake-up quiz function.
   *
   * **Note:** This website will never have many visitors or people playing this game.
   * That mean when a user play a game normally the serverFunction will have a cold start.
   * So that the user does not experience this delay, we wake up the server function before
   * the user start the game.
   */
  private wakeUpQuizFunction() {
    this.http
      .post(this.endpoints.quiz, 'wake-up')
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  /**
   * Generates a new quiz.
   * Sends a POST request to the quiz endpoint to generate a quiz based on the specified topic.
   * @param topic The topic for the quiz. If not specified, a random topic will be used.
   */
  public generateQuiz(topic?: string) {
    this.generatingQuestions = true;
    this.state.set('pending');
    this.level.set(0);
    this.generateErrorMsg.set('');
    this.questions.set([]);
    this.generateNewQuestion(topic);
    this.router.navigate([
      '/relax',
      'quantum-quiz',
      { outlets: { state: 'generate' } },
    ]);
  }

  private streamQuiz$(topic?: string): Observable<QuizResponse> {
    return new Observable<QuizResponse>((observer) => {
      const controller = new AbortController();

      fetch(this.endpoints.quiz, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          lang: $localize`en`,
        }),
        signal: controller.signal,
      })
        .then(async (response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const response = decoder.decode(value, { stream: true });

            try {
              const msg: QuizResponse = JSON.parse(response);
              msg.quiz = JSON.parse(msg.value);
              observer.next(msg);
            } catch (e) {
              this.logger.error(`Invalid chunk: ${e}`);
            }
          }

          observer.complete();
        })
        .catch((err) => observer.error(err));

      return () => {
        controller.abort();
      };
    });
  }

  /**
   * Generates a new quiz question based on the provided topic.
   *
   * This method sends a POST request to the quiz endpoint to fetch a new question.
   * If the response contains a valid question, it updates the quiz state and continues
   * fetching questions until the quiz has at least 15 questions.
   *
   * If an error occurs during the request or response processing, appropriate error
   * handling is performed and the quiz state is updated accordingly.
   *
   * @param topic An optional parameter specifying the topic for the new question.
   *              If no topic is provided, a question from a random topic may be fetched.
   */
  private generateNewQuestion(topic?: string) {
    if (!this.generatingQuestions) return;

    this.streamQuiz$(topic)
      .pipe(
        takeUntil(
          this.destroyQuizGeneration$.pipe(
            tap(() => {
              this.generatingQuestions = false;
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => {
          if (this.questions().length === 0) {
            this.router.navigate(
              ['/relax', 'quantum-quiz', { outlets: { state: 'play' } }],
              {
                replaceUrl: true,
              },
            );
          }
          if (data.topic) this.topic.set(data.topic);
          this.questions.update((items) => [...items, data.quiz!]);
          this.logger.info(`Question ${this.questions().length}`).print(data);
          if (this.questions().length >= 15 && !this.generatingQuestions) {
            this.generatingQuestions = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.generateErrorMsg.set(
            error?.statusText ?? $localize`Unknown error occurs`,
          );
          this.router.navigate(
            ['/relax', 'quantum-quiz', { outlets: { state: 'choose-topic' } }],
            {
              replaceUrl: true,
            },
          );
        },
      });
  }

  /**
   * Handles the state change event.
   * Updates the won cash and game state based on the provided data.
   * @param data The state change data.
   */
  public gameEnd() {
    this.wonCash.set(this.cashList[15 - this.level()] ?? 0);
    this.destroyQuizGeneration$.next();
    this.generateErrorMsg.set('');

    this.router.navigate(
      [
        '/relax',
        'quantum-quiz',
        {
          outlets: {
            state: this.isGameWon ? 'won' : 'loose',
          },
        },
      ],
      {
        replaceUrl: true,
      },
    );
  }

  /**
   * Indicates if the user won the game.
   */
  public get isGameWon() {
    return this.state() !== 'wrong' && this.level() >= 14;
  }
}
