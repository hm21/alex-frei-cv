import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardEffectsDirective } from 'src/app/directives/card-effets/card-effects.directive';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';

@Component({
  selector: 'af-contact-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, CardEffectsDirective,SafePipe],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
})
export class ContactCardComponent {
  public chevronRight = svgChevronRight;
  
  /**
   * Represents the URL for the contact card.
   */
  public url = input.required<string>();

  /**
   * Represents the id for the contact card.
   */
  public id = input.required<string>();
}
