import { DecimalPipe, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { QuizGameState } from '../../utils/quiz-enum';
import { GameStateChanged, Quiz } from '../../utils/quiz-interface';

@Component({
  selector: 'af-quantum-quiz-game',
  standalone: true,
  imports: [DecimalPipe, NgClass],
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
  @ViewChild('answerRefA') answerRefA!: ElementRef<HTMLButtonElement>;
  @ViewChild('answerRefB') answerRefB!: ElementRef<HTMLButtonElement>;
  @ViewChild('answerRefC') answerRefC!: ElementRef<HTMLButtonElement>;
  @ViewChild('answerRefD') answerRefD!: ElementRef<HTMLButtonElement>;

  @Output() stateChanged = new EventEmitter<GameStateChanged>();
  @Input({ required: true }) quiz!: Quiz[];

  public level = signal(0);
  public state = signal<'pending' | 'correct' | 'wrong'>('pending');

  public readonly cashList = [
    1_000_000, 500_000, 125_000, 64_000, 32_000, 16_000, 8_000, 4_000, 2_000,
    1_000, 500, 300, 200, 100, 50,
  ];

  private renderer = inject(Renderer2);

  override ngOnInit(): void {
    this.listenShortcutKeys();
    super.ngOnInit();
  }

  public selectOption(option: 'A' | 'B' | 'C' | 'D') {
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

  public nextPage() {
    this.stateChanged.emit({
      currentCash: this.cashList[15 - this.level()],
      state: this.state() !== 'wrong' ? QuizGameState.won : QuizGameState.loose,
    });
  }
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

  public activeQuestion = computed(() => {
    return this.quiz[this.level()].question;
  });
  public answerA = computed(() => {
    return this.quiz[this.level()].answers[0];
  });
  public answerB = computed(() => {
    return this.quiz[this.level()].answers[1];
  });
  public answerC = computed(() => {
    return this.quiz[this.level()].answers[2];
  });
  public answerD = computed(() => {
    return this.quiz[this.level()].answers[3];
  });
  public correctAnswerLetter = computed(() => {
    switch (this.quiz[this.level()].correctAnswer) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        throw new Error('Correct answer not exists!');
    }
  });
}
