import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { RecommendedPagesComponent } from 'src/app/shared/components/recommended-pages/recommended-pages.component';
import { FeaturedProjectsComponent } from '../portfolio/components/featured-projects/featured-projects.component';
import { ResumeSkillsComponent } from '../resume/components/resume-skills/resume-skills.component';
import { AboutMeHobbiesComponent } from './components/about-me-hobbies/about-me-hobbies.component';
import { AboutMeIntroComponent } from './components/about-me-intro/about-me-intro.component';
import { AboutMeServicesComponent } from './components/about-me-services/about-me-services.component';
import { AboutMeSkillsComponent } from './components/about-me-skills/about-me-skills.component';
import { FactsComponent } from './components/facts/facts.component';

@Component({
  selector: 'af-about-me',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AboutMeHobbiesComponent,
    AboutMeIntroComponent,
    AboutMeServicesComponent,
    AboutMeSkillsComponent,
    FeaturedProjectsComponent,
    ResumeSkillsComponent,
    FactsComponent,
    RecommendedPagesComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  host: {
    class: 'page-container',
  },
})
export class AboutMeComponent extends ExtendedComponent {
  protected override pageMeta: PageMetaData = {
    title: $localize`About Alex Frei`,
    description: $localize`Learn more about Alex Frei`,
  };
}
