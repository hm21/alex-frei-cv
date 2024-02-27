import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { environment } from 'src/environments/environment';
import { QuantumQuizChooseTopicComponent } from './components/quantum-quiz-choose-topic/quantum-quiz-choose-topic.component';
import { QuantumQuizGameComponent } from './components/quantum-quiz-game/quantum-quiz-game.component';
import { QuantumQuizGenerateQuizComponent } from './components/quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';
import { QuantumQuizInstructionComponent } from './components/quantum-quiz-instruction/quantum-quiz-instruction.component';
import { QuantumQuizLooseComponent } from './components/quantum-quiz-loose/quantum-quiz-loose.component';
import { QuantumQuizWonComponent } from './components/quantum-quiz-won/quantum-quiz-won.component';
import { GameState } from './utils/quiz-enum';
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
  styleUrls: ['./styles/quiz-card.scss', './quantum-quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardAni', [
      transition(
        ':enter',
        [
          style({
            opacity: 0.3,
            transform: 'translateX(30px)',
          }),
          animate('{{duration}} ease', style({ opacity: 1, transform: '*' })),
        ],
        { params: { duration: '500ms' } },
      ),
    ]),
  ],
})
export class QuantumQuizComponent {
  public GameState = GameState;
  public gameState = signal<GameState>(GameState.instruction);

  public wonCash = signal(0);

  public generateErrorMsg = '';

  public quiz: Quiz[] = [];

  private http = inject(HttpClient);

  public generateQuiz(topic?: string) {
    this.gameState.set(GameState.generateQuiz);

    this.http
      .post(environment.endpoints.quiz, {
        topic,
      })
      .subscribe({
        next: (res: any) => {
          const data = JSON.parse(res ?? '{}');

          if (data?.['quiz']) {
            this.quiz = data?.['quiz'];
            this.gameState.set(GameState.active);
          } else {
            this.generateErrorMsg =
              data?.['error'] ?? $localize`Unknown error occurs`;
            this.gameState.set(GameState.chooseTopic);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.generateErrorMsg =
            error?.statusText ?? $localize`Unknown error occurs`;
          this.gameState.set(GameState.chooseTopic);
        },
      });
  }

  public onStateChanged(data: GameStateChanged) {
    this.wonCash.set(data.currentCash ?? 0);
    this.gameState.set(data.state);
  }
}
