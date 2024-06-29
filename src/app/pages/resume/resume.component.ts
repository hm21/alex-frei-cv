import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ResumeSkillsComponent } from './components/resume-skills/resume-skills.component';
import { ResumeTimelineComponent } from './components/resume-timeline/resume-timeline.component';

@Component({
  selector: 'af-resume',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RecommendedPagesComponent,
    ResumeTimelineComponent,
    ResumeSkillsComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent extends ExtendedComponent {
  protected override pageMeta: PageMetaData = {
    title: $localize`Resume Alex Frei`,
    description: $localize`Take a look on the resume from Alex Frei.`,
  };
  override ngOnInit(): void {
    this.classList.add('page-padding');
    super.ngOnInit();
  }
}
