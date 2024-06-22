import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_OPTIONS } from 'src/app/configs/contact-options';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
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
export class ContactComponent extends ExtendedComponent {
  public contactOptions = CONTACT_OPTIONS;

  protected override pageMeta: MetaDataI = {
    title: $localize`Contact Alex Frei`,
    description: $localize`Contact Alex Frei right now.`,
  };
  override ngOnInit(): void {
    this.classList.add('page-padding');
    super.ngOnInit();
  }
}
