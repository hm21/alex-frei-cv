import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { CONTACT_OPTIONS } from 'src/app/shared/constants/contact-options.constants';
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
    class: 'page-container',
  },
})
export class ContactComponent extends ExtendedComponent implements OnInit {
  public readonly contactOptions = CONTACT_OPTIONS;

  protected override pageMeta: PageMetaData = {
    title: $localize`Contact Alex Frei`,
    description: $localize`Contact Alex Frei right now.`,
  };
  override ngOnInit(): void {
    this.classList.add('page-padding');
    super.ngOnInit();
  }
}
