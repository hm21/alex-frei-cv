import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';

@Component({
  selector: 'af-color-clash-instruction',
  standalone: true,
  imports: [RouterLink, QuicklinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color-clash-instruction.component.html',
  styleUrls: [
    './color-clash-instruction.component.scss',
    '../../../../styles/game-page-animation.scss',
  ],
  host: {
    class: 'card',
  },
})
export class ColorClashInstructionComponent {}
