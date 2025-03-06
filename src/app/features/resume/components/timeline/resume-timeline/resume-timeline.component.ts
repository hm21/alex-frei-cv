import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RESUME_TIMELINE_ITEMS } from 'src/app/shared/constants/resume/resume-timeline.constants';
import { ResumeTimelineItem } from '../../../interfaces/resume.interface';
import { ResumeDateBannerComponent } from '../resume-date-banner/resume-date-banner.component';
import { ResumeTimelineItemComponent } from '../resume-timeline-item/resume-timeline-item.component';

@Component({
  selector: 'af-resume-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResumeDateBannerComponent, ResumeTimelineItemComponent],
  templateUrl: './resume-timeline.component.html',
  styleUrl: './resume-timeline.component.scss',
})
export class ResumeTimelineComponent {
  /**
   * An array of resume timeline items.
   */
  public items: ResumeTimelineItem[] = RESUME_TIMELINE_ITEMS;
}
