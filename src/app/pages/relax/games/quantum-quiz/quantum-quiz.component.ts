import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  isDevMode,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { GAMES } from 'src/app/configs/games';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { environment } from 'src/environments/environment';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { Game } from '../../utils/game-model';
import { QuantumQuizChooseTopicComponent } from './components/quantum-quiz-choose-topic/quantum-quiz-choose-topic.component';
import { QuantumQuizGameComponent } from './components/quantum-quiz-game/quantum-quiz-game.component';
import { QuantumQuizGenerateQuizComponent } from './components/quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';
import { QuantumQuizInstructionComponent } from './components/quantum-quiz-instruction/quantum-quiz-instruction.component';
import { QuantumQuizLooseComponent } from './components/quantum-quiz-loose/quantum-quiz-loose.component';
import { QuantumQuizWonComponent } from './components/quantum-quiz-won/quantum-quiz-won.component';
import { QuizGameState } from './utils/quiz-enum';
import { GameStateChanged, Quiz } from './utils/quiz-interface';

@Component({
  selector: 'af-quantum-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameHeaderComponent,
    FormsModule,
    QuantumQuizChooseTopicComponent,
    QuantumQuizGenerateQuizComponent,
    QuantumQuizInstructionComponent,
    QuantumQuizGameComponent,
    QuantumQuizLooseComponent,
    QuantumQuizWonComponent,
  ],
  templateUrl: './quantum-quiz.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/quiz-card.scss',
    './quantum-quiz.component.scss',
  ],
  animations: [cardFadeInUpScale],
})
export class QuantumQuizComponent extends ExtendedComponent implements OnInit {
  /**
   * The metadata for the page.
   */
  protected override pageMeta: MetaDataI = {
    title: $localize`Quantum Quiz Game`,
    description: $localize`Can you emerge victorious on the millionaire show with your AI-generated topic?`,
  };

  /**
   * The possible game states for the Quantum Quiz.
   */
  public GameState = QuizGameState;

  /**
   * The current game state.
   */
  public gameState = signal<QuizGameState>(QuizGameState.instruction);

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
  public quiz = signal<Quiz[]>([]);

  /**
   * The HTTP client instance.
   */
  private http = inject(HttpClient);

  /**
   * The router instance used for navigation.
   */
  private router = inject(Router);

  /**
   * A subject used to signal the destruction of the quiz generation process.
   * When this subject emits a value, all subscriptions related to quiz generation are terminated.
   */
  private destroyQuizGeneration$ = new Subject();

  /** Informations about the game  */
  public game!: Game;

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.wakeUpQuizFunction();
      this.initKeyListener();
    }
    this.game = GAMES.find((el) => el.id === 'quantum-quiz')!;
    super.ngOnInit();
  }

  /**
   * Initializes the key listener for the Escape key.
   * When the Escape key is pressed, the user is navigated to the 'relax' page.
   */
  private initKeyListener() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.router.navigate(['relax']);
      });
  }

  /**
   * Performs the wake-up quiz function.
   * 
   * **Note:** This website will never have many visitors or people playing this game. 
   * That mean when a user play a game normaly the serverfunction will have a cold start. 
   * So that the user does not experience this delay, we wake up the server function before 
   * the user start the game.
   */
  private wakeUpQuizFunction() {
    this.http
      .post(environment.endpoints.quiz, 'wake-up')
      .pipe(this.destroyPipe())
      .subscribe();
  }

  /**
   * Generates a new quiz.
   * Sends a POST request to the quiz endpoint to generate a quiz based on the specified topic.
   * @param topic The topic for the quiz. If not specified, a random topic will be used.
   */
  public generateQuiz(topic?: string) {
    this.gameState.set(QuizGameState.generateQuiz);
    this.generateErrorMsg.set('');
    this.quiz.set([]);
    this.generateNewQuestion(topic);
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
    this.http
      .post(environment.endpoints.quiz, {
        topic,
        lang: $localize`en`,
        questions: this.quiz().map((el) => el.question),
      })
      .pipe(takeUntil(this.destroyQuizGeneration$), this.destroyPipe())
      .subscribe({
        next: (res: any) => {
          let data: any = {};
          try {
            data = JSON.parse(res ?? '{}');
          } catch (error) {
            console.error('JSON.parse failed', error);
            return this.generateNewQuestion(topic);
          }

          if (data && !data?.error) {
            if (this.quiz.length === 0) {
              this.gameState.set(QuizGameState.active);
            }
            if (isDevMode()) console.log(data);
            this.quiz.update((items) => [...items, data]);
            if (
              this.quiz().length < 15 &&
              this.gameState() === QuizGameState.active
            ) {
              this.generateNewQuestion(topic);
            }
          } else {
            this.generateErrorMsg.set(
              data?.['error'] ?? $localize`Unknown error occurs`,
            );
            this.gameState.set(QuizGameState.chooseTopic);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.generateErrorMsg.set(
            error?.statusText ?? $localize`Unknown error occurs`,
          );
          this.gameState.set(QuizGameState.chooseTopic);
        },
      });
  }

  /**
   * Handles the state change event.
   * Updates the won cash and game state based on the provided data.
   * @param data The state change data.
   */
  public onStateChanged(data: GameStateChanged) {
    this.wonCash.set(data.currentCash ?? 0);
    this.gameState.set(data.state);
    this.destroyQuizGeneration$.next(null);
    this.generateErrorMsg.set('');
  }
}
