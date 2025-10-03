import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import svgLooseIcon from 'src/assets/img/game/quantum-quiz/loose.svg';
import { QuizManagerService } from '../../services/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz-loose',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink, QuicklinkDirective, SafePipe],
  templateUrl: './quantum-quiz-loose.component.html',
  styleUrls: [
    '../../../../styles/game-button.scss',
    './quantum-quiz-loose.component.scss',
    '../../../../styles/game-page-animation.scss',
  ],
  host: {
    class: 'card',
  },
})
export class QuantumQuizLooseComponent extends ExtendedComponent {
  protected readonly looseIcon = svgLooseIcon;

  private gameManager = inject(QuizManagerService);

  public get wonCash() {
    return this.gameManager.wonCash;
  }
}
