import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  signal,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumQuizChooseTopicComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('errorRef', { read: ViewContainerRef, static: true })
  errorRef!: ViewContainerRef;
  @ViewChild('errorTemplate', { read: TemplateRef, static: true })
  errorTemplate!: TemplateRef<any>;

  @Input() errorMsg?: string;
  @Output() generateQuiz = new EventEmitter<string>();

  public topic = signal('');

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');

    if (this.errorMsg) this.createError(this.errorMsg);
  }

  ngOnDestroy(): void {
    this.errorRef.clear();
  }

  public generate(random?: boolean) {
    this.errorRef.clear();
    if (!random) {
      if (this.topic().length < 3 || this.topic().length > 20) {
        this.createError(
          $localize`The topic must be between 3 and 20 characters long!`,
        );
      } else if (!isNaN(+this.topic())) {
        this.createError($localize`The topic must be a text and not number`);
      } else {
        this.generateQuiz.emit(random ? undefined : this.topic());
      }
    } else {
      this.generateQuiz.emit(random ? undefined : this.topic());
    }
  }

  private createError(msg: string) {
    this.errorRef.createEmbeddedView(this.errorTemplate, {
      msg,
    });
  }
}
