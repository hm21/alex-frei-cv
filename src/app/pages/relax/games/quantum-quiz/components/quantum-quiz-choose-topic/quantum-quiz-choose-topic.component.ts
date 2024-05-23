import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-choose-topic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quantum-quiz-choose-topic.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './quantum-quiz-choose-topic.component.scss',
  ],
  
})
export class QuantumQuizChooseTopicComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /**
   * The reference to the error view container.
   */
  @ViewChild('errorRef', { read: ViewContainerRef, static: true })
  errorRef!: ViewContainerRef;

  /**
   * The reference to the error template.
   */
  @ViewChild('errorTemplate', { read: TemplateRef, static: true })
  errorTemplate!: TemplateRef<any>;

  /**
   * The error message to display.
   */
  @Input() errorMsg?: string;

  /**
   * Event emitter for generating a quiz.
   */
  @Output() generateQuiz = new EventEmitter<string>();

  /**
   * The selected topic for the quiz.
   */
  public topic = signal('');

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');

    if (this.errorMsg) this.createError(this.errorMsg);
  }

  ngOnDestroy(): void {
    this.errorRef.clear();
  }

  /**
   * Generates a quiz based on the selected topic.
   * @param random - Indicates whether to generate a random quiz or not.
   */
  public generate(random?: boolean) {
    this.errorRef.clear();
    if (!random) {
      if (this.topic().length < 3 || this.topic().length > 20) {
        this.createError(
          $localize`The topic must be between 3 and 20 characters long!`,
        );
      } else if (!isNaN(+this.topic())) {
        this.createError($localize`The topic must be a text and not a number`);
      } else {
        this.generateQuiz.emit(random ? undefined : this.topic());
      }
    } else {
      this.generateQuiz.emit(random ? undefined : this.topic());
    }
  }

  /**
   * Creates an error message and displays it.
   * @param msg - The error message to display.
   */
  private createError(msg: string) {
    this.errorRef.createEmbeddedView(this.errorTemplate, {
      msg,
    });
  }
}
