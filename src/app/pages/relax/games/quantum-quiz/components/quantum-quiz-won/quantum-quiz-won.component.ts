import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-won',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './quantum-quiz-won.component.html',
  styleUrls: [
    '../../../../styles/game-button.scss',
    './quantum-quiz-won.component.scss',
  ],
})
export class QuantumQuizWonComponent
  extends ExtendedComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
