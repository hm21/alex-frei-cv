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
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { environment } from 'src/environments/environment';
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
  imports: [
    BackBtnComponent,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public generateErrorMsg = '';

  /**
   * The list of quiz questions.
   */
  public quiz: Quiz[] = [];

  /**
   * The HTTP client instance.
   */
  private http = inject(HttpClient);

  override ngOnInit(): void {
    if (this.isBrowser) this.wakeUpQuizFunction();
    super.ngOnInit();
  }

  /**
   * Performs the wake-up quiz function.
   * Sends a POST request to the quiz endpoint to wake up the quiz function for faster response.
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
    this.quiz = [];
    this.generateNewQuestion(topic);
  }

  private generateNewQuestion(topic?: string) {
    this.http
      .post(environment.endpoints.quiz, {
        topic,
        lang: $localize`en`,
        questions: this.quiz.map((el) => el.question),
      })
      .pipe(this.destroyPipe())
      .subscribe({
        next: (res: any) => {
          const data = JSON.parse(res ?? '{}');

          if (data && !data?.error) {
            if (this.quiz.length === 0) {
              this.gameState.set(QuizGameState.active);
            }
            if (isDevMode()) console.log(data);
            this.quiz.push(data);
            this.cdRef.detectChanges();
            if (
              this.quiz.length < 15 &&
              this.gameState() === QuizGameState.active
            ) {
              this.generateNewQuestion(topic);
            }
          } else {
            this.generateErrorMsg =
              data?.['error'] ?? $localize`Unknown error occurs`;
            this.gameState.set(QuizGameState.chooseTopic);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.generateErrorMsg =
            error?.statusText ?? $localize`Unknown error occurs`;
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
  }
}
