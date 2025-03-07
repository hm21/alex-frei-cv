import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  INJECTOR,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import {
  delay,
  filter,
  fromEvent,
  map,
  startWith,
  Subject,
  tap,
  throttleTime,
} from 'rxjs';
import { GitRepositoryStatistics } from 'src/app/core/services/git-manager/interfaces/git-repo-stats.interface';
import { ProjectDetailsComponent } from 'src/app/features/portfolio/components/project-details/project-details.component';
import { ProjectDetails } from 'src/app/features/portfolio/interfaces/portfolio.interfaces';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { GitRepoStatsComponent } from 'src/app/shared/components/git-repo-stats/git-repo-stats.component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalImageViewerComponent } from 'src/app/ui/modal/components/modal-image-viewer/modal-image-viewer.component';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { ModalImagePreviewData } from 'src/app/ui/modal/utils/modal.interface';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';
import { ResumeMore } from '../../../interfaces/resume.interface';

@Component({
  selector: 'af-resume-timeline-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SafePipe,
    CardComponent,
    GitRepoStatsComponent,
    NgxScrollAnimationsDirective,
  ],
  templateUrl: './resume-timeline-item.component.html',
  styleUrl: './resume-timeline-item.component.scss',
})
export class ResumeTimelineItemComponent
  extends ExtendedComponent
  implements OnInit, AfterViewInit
{
  /** Modal manager service for opening project details. */
  private modal = inject(ModalService);
  private injector = inject(INJECTOR);

  /** SVG icon for the chevron right. */
  protected readonly chevronRightIcon = svgChevronRight;

  /** Resume item data. */
  public more = input<ResumeMore>();
  public isReversed = input<boolean>();
  public gitStats = input<GitRepositoryStatistics | undefined>();
  public enableGitStats = input<boolean | undefined>();

  /** Reference to the sonar element for triggering animations. */
  private sonarRef = viewChild.required<ElementRef<HTMLElement>>('sonarRef');

  private mouseEnter$ = new Subject<void>();

  /** The duration from the sonar animation */
  private readonly sonarAnimationDuration = 1500;

  protected isMultiRowDesign = toSignal(
    this.screen.resize$.pipe(
      // Ensure the screen width is updated first
      delay(1),
      map(() => this.screen.width),
      startWith(this.screen.width),
      map((width) => width >= 1280),
    ),
  );

  private get sonarClassList() {
    return this.sonarRef().nativeElement.classList;
  }

  ngAfterViewInit(): void {
    this.hoverListener();
  }

  /**
   * Listens for hover events on the component and triggers the animation state change.
   */
  private hoverListener() {
    this.sonarRef().nativeElement.style.animationDuration = `${this.sonarAnimationDuration}ms`;
    fromEvent(this.nativeElement, 'mouseenter')
      .pipe(
        throttleTime(50),
        filter(() => !this.sonarClassList.contains('sonar-animation')),
        tap(() => {
          this.mouseEnter$.next();
          this.sonarClassList.add('sonar-animation');
        }),
        delay(this.sonarAnimationDuration),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.sonarClassList.remove('sonar-animation');
      });
  }

  /**
   * Opens the item with additional details.
   */
  protected showMore() {
    if (this.more()?.projectDetails) {
      this.modal.open<ProjectDetailsComponent, ProjectDetails>(
        ProjectDetailsComponent,
        {
          data: this.more()!.projectDetails,
          injector: this.injector,
        },
      );
    } else if (this.more()?.imagePreview) {
      this.modal.open<ModalImageViewerComponent, ModalImagePreviewData>(
        ModalImageViewerComponent,
        {
          data: this.more()!.imagePreview,
          injector: this.injector,
        },
      );
    } else {
      throw new Error('No project details or image preview provided.');
    }
  }
}
