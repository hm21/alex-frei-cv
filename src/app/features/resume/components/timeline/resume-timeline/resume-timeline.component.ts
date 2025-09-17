import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { RESUME_TIMELINE_ITEMS } from 'src/app/core/constants/resume/resume-timeline.constants';
import { GitManagerService } from 'src/app/core/services/git-manager/git-manager.service';
import svgFork from 'src/assets/img/icon/git-forks.svg';
import svgStar from 'src/assets/img/icon/star.svg';
import { ResumeTimelineItem } from '../../../types/resume-timeline-item.type';
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
export class ResumeTimelineComponent implements OnInit {
  private gitManager = inject(GitManagerService);
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  /**
   * An array of resume timeline items.
   */
  public readonly items: ReadonlyArray<ResumeTimelineItem> = RESUME_TIMELINE_ITEMS;

  protected readonly starIcon = svgStar;
  protected readonly forkIcon = svgFork;

  ngOnInit(): void {
    this.initializeGitStats();
  }

  /**
   * Initializes the Git statistics for the items that have `enableGitStats` set to `true`.
   */
  private initializeGitStats() {
    const items = this.items.filter((el) => el.enableGitStats);

    for (const item of items) {
      if (!item.repoName) {
        throw new Error(
          'The repoName is required when `enableGitStats` is `true`',
        );
      }
      this.gitManager
        .getRepoStats(item.repoName)
        .pipe(takeUntilDestroyed(this.destroyRef),delay(2000))
        .subscribe((res) => {
          item.gitStats = res;
          this.cdRef.detectChanges();
        });
    }
  }
}
