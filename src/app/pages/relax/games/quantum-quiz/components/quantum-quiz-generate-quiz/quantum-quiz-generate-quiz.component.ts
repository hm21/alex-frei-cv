import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-generate-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinnerComponent],
  templateUrl: './quantum-quiz-generate-quiz.component.html',
  styleUrl: './quantum-quiz-generate-quiz.component.scss',
})
export class QuantumQuizGenerateQuizComponent
  extends ExtendedComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
