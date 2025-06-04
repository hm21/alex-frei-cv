import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardEffectsDirective } from 'src/app/shared/directives/card-effects/card-effects.directive';
import { ThumbnailBase64Directive } from 'src/app/shared/directives/thumbnail-base64/thumbnail-base64.directive';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';
import { ContactCardThumbnailPipe } from '../../pipes/contact-card-thumbnail.pipe';
import { ContactCardId } from '../../types/contact-card-id.type';

@Component({
  selector: 'af-contact-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ContactCardThumbnailPipe,
    CardEffectsDirective,
    ThumbnailBase64Directive,
    SafePipe,
  ],
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
  public id = input.required<ContactCardId>();
}
