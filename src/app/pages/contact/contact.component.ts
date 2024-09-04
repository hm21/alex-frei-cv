import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CONTACT_OPTIONS } from 'src/app/configs/contact-options';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'af-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactCardComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
