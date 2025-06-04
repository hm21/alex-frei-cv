import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { PROJECT_PRO_IMAGE_EDITOR } from 'src/app/shared/constants/projects/project-pro_image_editor.constants';
import { PROJECT_PRO_VIDEO_EDITOR } from 'src/app/shared/constants/projects/project-pro_video_editor.constants';
import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalService } from 'src/app/ui/modal/modal.service';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';
import { ProjectDetails } from '../../types/project.type';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-featured-projects',
  imports: [
    RouterLink,
    SafePipe,
    QuicklinkDirective,
    NgxScrollAnimationsDirective,
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjectsComponent {
  /** Modal manager service for opening project details. */
  private modal = inject(ModalService);
  private injector = inject(INJECTOR);

  public readonly chevronRight = svgChevronRight;

  public readonly projects: ReadonlyArray<ProjectDetails> = [
    PROJECT_SNAPTAB,
    PROJECT_PRO_IMAGE_EDITOR,
    PROJECT_PRO_VIDEO_EDITOR,
  ];

  /**
   * Opens the project details modal.
   */
  public openProject(project: ProjectDetails) {
    this.modal.open<ProjectDetailsComponent, ProjectDetails>(
      ProjectDetailsComponent,
      {
        data: project,
        injector: this.injector,
      },
    );
  }
}
