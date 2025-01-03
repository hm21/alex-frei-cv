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
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { fromEvent } from 'rxjs';
import { ProjectDetailsComponent } from 'src/app/pages/portfolio/components/project-details/project-details.component';
import { ProjectDetails } from 'src/app/pages/portfolio/utils/portfolio-interfaces';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ModalImageViewerComponent } from 'src/app/shared/modal/components/modal-image-viewer/modal-image-viewer.component';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ModalImagePreviewData } from 'src/app/shared/modal/utils/modal.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';
import { ResumeMore } from '../../../utils/resume.interface';

@Component({
  selector: 'af-resume-timeline-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective, SafePipe],
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
  protected readonly chevronRight = svgChevronRight;

  /** Resume item data. */
  public more = input<ResumeMore>();

  /** Reference to the sonar element for triggering animations. */
  private sonar = viewChild.required<ElementRef<HTMLElement>>('sonar');

  ngAfterViewInit(): void {
    this.hoverListener();
  }

  /**
   * Listens for hover events on the component and triggers the animation state change.
   */
  private hoverListener() {
    fromEvent(this.nativeElement, 'mouseenter')
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.sonar().nativeElement.classList.add('sonar-animation');
      });

    fromEvent(this.sonar().nativeElement, 'animationend')
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.sonar().nativeElement.classList.remove('sonar-animation');
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
