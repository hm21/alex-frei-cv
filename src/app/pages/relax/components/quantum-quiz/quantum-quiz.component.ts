import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
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
  animations: [cardFadeInUpScale],
})
export class QuantumQuizComponent extends ExtendedComponent implements OnInit {
  public GameState = GameState;
  public gameState = signal<GameState>(GameState.instruction);

  public wonCash = signal(0);

  public generateErrorMsg = '';

  public quiz: Quiz[] = [];

  private http = inject(HttpClient);

  override ngOnInit(): void {
    if (this.isBrowser) this.wakeUpQuizFunction();
    super.ngOnInit();
  }

  private wakeUpQuizFunction() {
    this.http
      .post(environment.endpoints.quiz, 'wake-up')
      .pipe(this.destroyPipe())
      .subscribe();
  }

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
