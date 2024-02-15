import { Component } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { FactsComponent } from './components/facts/facts.component';

@Component({
  selector: 'af-about-me',
  standalone: true,
  imports: [FactsComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI ={
    title:$localize`About Alex Frei`,
    description: $localize`Learn more about Alex Frei`,
  }
}
