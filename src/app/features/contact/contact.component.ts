import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_OPTIONS } from 'src/app/core/constants/contact-options.constants';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'af-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ContactCardComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: {
    class: 'page-container page-padding',
  },
})
export class ContactComponent extends ExtendedComponent {
  public readonly contactOptions = CONTACT_OPTIONS;

  protected override pageMeta: PageMetaData = {
    title: $localize`Contact Alex Frei`,
    description: $localize`Contact Alex Frei right now.`,
  };
}
