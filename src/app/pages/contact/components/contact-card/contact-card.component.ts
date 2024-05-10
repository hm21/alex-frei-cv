import {
  ChangeDetectionStrategy,
  Component,
  HostAttributeToken,
  inject,
} from '@angular/core';

@Component({
  selector: 'af-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  /**
   * Represents the URL for the contact card.
   */
  public url = inject(new HostAttributeToken('url'), { optional: false });
}
