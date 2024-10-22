import { DecimalPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { QuizManagerService } from '../../utils/quiz-manager.service';
import { QuantumQuizGenerateQuizComponent } from '../quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';

@Component({
  selector: 'af-quantum-quiz-game',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuantumQuizGenerateQuizComponent, DecimalPipe, NgClass],
  templateUrl: './quantum-quiz-game.component.html',
  styleUrls: [
    '../../../../styles/game-button.scss',
    '../../../../styles/game-shortcut-key.scss',
    './quantum-quiz-game.component.scss',
  ],
})
export class QuantumQuizGameComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  private gameManager = inject(QuizManagerService);

  /**
   * Reference to the answer button element for option A.
   */
  public answerRefA =
    viewChild.required<ElementRef<HTMLButtonElement>>('answerRefA');

  /**
   * Reference to the answer button element for option B.
   */
  public answerRefB =
    viewChild.required<ElementRef<HTMLButtonElement>>('answerRefB');

  /**
   * Reference to the answer button element for option C.
   */
  public answerRefC =
    viewChild.required<ElementRef<HTMLButtonElement>>('answerRefC');

  /**
   * Reference to the answer button element for option D.
   */
  public answerRefD =
    viewChild.required<ElementRef<HTMLButtonElement>>('answerRefD');

  public get level() {
    return this.gameManager.level;
  }
  public get state() {
    return this.gameManager.state;
  }
  public get cashList() {
    return this.gameManager.cashList;
  }

  public get quizQuestions() {
    return this.gameManager.questions;
  }

  public get topic(){
    return this.gameManager.topicTranslated;
  }


  override ngOnInit(): void {
    this.listenShortcutKeys();
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.gameManager.destroyQuizGeneration$.next();
  }
  /**
   * Handles the selection of an option in the game.
   * @param option The selected option ('A', 'B', 'C', or 'D').
   */
  public selectOption(option: 'A' | 'B' | 'C' | 'D') {
    if (this.level() >= this.quizQuestions().length) return;

    if (this.correctAnswerLetter() === option) {
      if (this.level() >= 14) {
        this.nextPage();
      } else {
        this.state.set('correct');
        this[`answerRef${option}`]().nativeElement.classList.add('correct');
      }
    } else {
      this.state.set('wrong');
      this.gameManager.destroyQuizGeneration$.next();
      this[`answerRef${option}`]().nativeElement.classList.add('wrong');
      this[`answerRef${this.correctAnswerLetter()}`]().nativeElement.classList.add('correct');
    }
  }

  /**
   * Moves to the next page in the game.
   */
  public nextPage() {
    this.gameManager.gameEnd();
  }

  /**
   * Moves to the next question in the game.
   */
  public nextQuestion() {
    this.level.update((level) => ++level);

    ['A', 'B', 'C', 'D'].forEach((el) => {
      this[`answerRef${el as 'A'}`]().nativeElement.classList.remove('correct');
    });

    this.state.set('pending');
  }

  /**
   * Listens for shortcut keys in the game.
   * Handles the Enter key and number keys (1, 2, 3, 4) for selecting options.
   */
  private listenShortcutKeys() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => {
          const key = event.key;
          return (
            key === '1' ||
            key === '2' ||
            key === '3' ||
            key === '4' ||
            key === 'Enter'
          );
        }),
        this.destroyPipe(),
      )
      .subscribe((event) => {
        if (event.key === 'Enter') {
          if (this.state() === 'correct') {
            this.nextQuestion();
          } else if (this.state() === 'wrong') {
            this.nextPage();
          }
        } else {
          const map = {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
          };
          this.selectOption(map[+event.key as 1] as 'A');
        }
      });
  }

  /**
   * Computed property for the active question in the game.
   */
  public activeQuestion = computed(() => {
    return this.quizQuestions()[this.level()].question;
  });

  /**
   * Computed property for answer option A in the game.
   */
  public answerA = computed(() => {
    return this.quizQuestions()[this.level()].answers[0];
  });

  /**
   * Computed property for answer option B in the game.
   */
  public answerB = computed(() => {
    return this.quizQuestions()[this.level()].answers[1];
  });

  /**
   * Computed property for answer option C in the game.
   */
  public answerC = computed(() => {
    return this.quizQuestions()[this.level()].answers[2];
  });

  /**
   * Computed property for answer option D in the game.
   */
  public answerD = computed(() => {
    return this.quizQuestions()[this.level()].answers[3];
  });

  /**
   * Computed property for the correct answer letter in the game.
   */
  public correctAnswerLetter = computed(() => {
    switch (this.quizQuestions()[this.level()].correctAnswer) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        throw new Error('Correct answer does not exist!');
    }
  });
}
