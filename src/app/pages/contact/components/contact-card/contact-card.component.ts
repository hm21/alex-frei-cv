import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'af-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  @Input({ required: true }) url!: string;
}
