import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { QuizManagerService } from '../../utils/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz-loose',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink, QuicklinkDirective],
  templateUrl: './quantum-quiz-loose.component.html',
  styleUrls: [
    '../../../../styles/game-button.scss',
    './quantum-quiz-loose.component.scss',
  ],
})
export class QuantumQuizLooseComponent
  extends ExtendedComponent
  implements OnInit
{
  private gameManager = inject(QuizManagerService);

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }

  public get wonCash() {
    return this.gameManager.wonCash;
  }
}
