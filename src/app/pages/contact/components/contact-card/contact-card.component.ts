import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';

@Component({
  selector: 'af-contact-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, CardEffectsDirective],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
})
export class ContactCardComponent {
  /**
   * Represents the URL for the contact card.
   */
  public url = input.required<string>();

  /**
   * Represents the id for the contact card.
   */
  public id = input.required<string>();
}
