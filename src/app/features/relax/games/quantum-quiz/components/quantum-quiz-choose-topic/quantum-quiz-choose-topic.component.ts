import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { QuizManagerService } from '../../services/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz-choose-topic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './quantum-quiz-choose-topic.component.html',
  styleUrl: './quantum-quiz-choose-topic.component.scss',
  host: {
    class: 'card',
  },
})
export class QuantumQuizChooseTopicComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /**
   * The reference to the error view container.
   */
  private errorRef = viewChild.required('errorRef', {
    read: ViewContainerRef,
  });

  /**
   * The reference to the error template.
   */
  private errorTemplate = viewChild.required('errorTemplate', {
    read: TemplateRef<any>,
  });

  /**
   * The selected topic for the quiz.
   */
  public topic = signal('');

  private gameManager = inject(QuizManagerService);

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.gameManager.generateErrorMsg()) {
      this.createError(this.gameManager.generateErrorMsg());
    }
  }

  ngOnDestroy(): void {
    this.errorRef().clear();
  }

  /**
   * Generates a quiz based on the selected topic.
   * @param random - Indicates whether to generate a random quiz or not.
   */
  public generate(random?: boolean) {
    this.errorRef().clear();
    if (random) {
      this.gameManager.generateQuiz(random ? undefined : this.topic());
      return;
    }

    if (this.topic().length < 3 || this.topic().length > 20) {
      this.createError(
        $localize`The topic must be between 3 and 20 characters long!`,
      );
    } else if (!isNaN(+this.topic())) {
      this.createError($localize`The topic must be a text and not a number`);
    } else {
      this.gameManager.generateQuiz(random ? undefined : this.topic());
    }
  }

  /**
   * Creates an error message and displays it.
   * @param msg - The error message to display.
   */
  private createError(msg: string) {
    this.errorRef().createEmbeddedView(this.errorTemplate(), {
      msg,
    });
  }
}
