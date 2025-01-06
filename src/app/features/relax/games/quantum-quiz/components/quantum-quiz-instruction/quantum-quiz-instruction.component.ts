import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';

@Component({
  selector: 'af-quantum-quiz-instruction',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './quantum-quiz-instruction.component.html',
  styleUrls: ['./quantum-quiz-instruction.component.scss'],
})
export class QuantumQuizInstructionComponent
  extends ExtendedComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
