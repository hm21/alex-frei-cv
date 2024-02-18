import { Component } from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { AboutMeHobbiesComponent } from './components/about-me-hobbies/about-me-hobbies.component';
import { AboutMeIntroComponent } from './components/about-me-intro/about-me-intro.component';
import { AboutMeServicesComponent } from './components/about-me-services/about-me-services.component';
import { AboutMeSkillsComponent } from './components/about-me-skills/about-me-skills.component';
import { FactsComponent } from './components/facts/facts.component';

@Component({
  selector: 'af-about-me',
  standalone: true,
  imports: [
    AboutMeHobbiesComponent,
    AboutMeIntroComponent,
    AboutMeServicesComponent,
    AboutMeSkillsComponent,
    FactsComponent,
    RecommendedPagesComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI = {
    title: $localize`About Alex Frei`,
    description: $localize`Learn more about Alex Frei`,
  };
}
