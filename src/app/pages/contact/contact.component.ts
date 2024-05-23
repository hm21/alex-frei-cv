import { Component } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'af-contact',
  standalone: true,
  imports: [
    ContactCardComponent,
    ContactFormComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI = {
    title: $localize`Contact Alex Frei`,
    description: $localize`Contact Alex Frei right now.`,
  };
}
