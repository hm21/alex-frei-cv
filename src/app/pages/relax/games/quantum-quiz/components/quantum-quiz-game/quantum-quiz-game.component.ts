import { DecimalPipe, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  computed,
  input,
  signal
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { QuizGameState } from '../../utils/quiz-enum';
import { GameStateChanged, Quiz } from '../../utils/quiz-interface';
import { QuantumQuizGenerateQuizComponent } from '../quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';

@Component({
  selector: 'af-quantum-quiz-game',
  standalone: true,
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
  implements OnInit
{
  /**
   * Reference to the answer button element for option A.
   */
  @ViewChild('answerRefA') answerRefA!: ElementRef<HTMLButtonElement>;

  /**
   * Reference to the answer button element for option B.
   */
  @ViewChild('answerRefB') answerRefB!: ElementRef<HTMLButtonElement>;

  /**
   * Reference to the answer button element for option C.
   */
  @ViewChild('answerRefC') answerRefC!: ElementRef<HTMLButtonElement>;

  /**
   * Reference to the answer button element for option D.
   */
  @ViewChild('answerRefD') answerRefD!: ElementRef<HTMLButtonElement>;

  /**
   * Event emitter for state changes in the game.
   */
  @Output() stateChanged = new EventEmitter<GameStateChanged>();

  /**
   * Input property for the quiz data.
   * The quiz data contains an array of Quiz objects.
   */
  public quiz = input.required<Quiz[]>();

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

  override ngOnInit(): void {
    this.listenShortcutKeys();
    super.ngOnInit();
  }

  /**
   * Handles the selection of an option in the game.
   * @param option The selected option ('A', 'B', 'C', or 'D').
   */
  public selectOption(option: 'A' | 'B' | 'C' | 'D') {
    if (this.level() >= this.quiz().length) return;

    if (this.correctAnswerLetter() === option) {
      if (this.level() >= 14) {
        this.nextPage();
      } else {
        this.state.set('correct');
        this.renderer.addClass(
          this[`answerRef${option}`].nativeElement,
          'correct',
        );
      }
    } else {
      this.state.set('wrong');
      this.renderer.addClass(this[`answerRef${option}`].nativeElement, 'wrong');
      this.renderer.addClass(
        this[`answerRef${this.correctAnswerLetter()}`].nativeElement,
        'correct',
      );
    }
  }

  /**
   * Moves to the next page in the game.
   */
  public nextPage() {
    this.stateChanged.emit({
      currentCash: this.cashList[15 - this.level()],
      state: this.state() !== 'wrong' ? QuizGameState.won : QuizGameState.loose,
    });
  }

  /**
   * Moves to the next question in the game.
   */
  public nextQuestion() {
    this.level.update((level) => ++level);

    ['A', 'B', 'C', 'D'].forEach((el) => {
      this.renderer.removeClass(
        this[`answerRef${el as 'A'}`].nativeElement,
        'correct',
      );
    });

    this.state.set('pending');
  }

  /**
   * Listens for shortcut keys in the game.
   * Handles the Enter key and number keys (1, 2, 3, 4) for selecting options.
   */
  private listenShortcutKeys() {
    fromEvent<KeyboardEvent>(document, 'keydown')
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
    return this.quiz()[this.level()].question;
  });

  /**
   * Computed property for answer option A in the game.
   */
  public answerA = computed(() => {
    return this.quiz()[this.level()].answers[0];
  });

  /**
   * Computed property for answer option B in the game.
   */
  public answerB = computed(() => {
    return this.quiz()[this.level()].answers[1];
  });

  /**
   * Computed property for answer option C in the game.
   */
  public answerC = computed(() => {
    return this.quiz()[this.level()].answers[2];
  });

  /**
   * Computed property for answer option D in the game.
   */
  public answerD = computed(() => {
    return this.quiz()[this.level()].answers[3];
  });

  /**
   * Computed property for the correct answer letter in the game.
   */
  public correctAnswerLetter = computed(() => {
    switch (this.quiz()[this.level()].correctAnswer) {
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
