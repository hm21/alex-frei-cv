import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProjectDetails } from '../../utils/portfolio-interfaces';
import { PROJECT_PRO_IMAGE_EDITOR } from '../../utils/projects/project-pro_image_editor';
import { PROJECT_WAIO } from '../../utils/projects/project-waio';
import { PROJECT_COUNT_ANIMATION } from '../../utils/projects/project_ngx-count-animation';
import { PROJECT_NGX_IMAGE_HERO } from '../../utils/projects/project_ngx-image-hero';
import { PROJECT_NGX_SCROLL_ANIMATIONS } from '../../utils/projects/project_ngx-scroll-animations';
import { PROJECT_SMART_HOME } from '../../utils/projects/project_smarthome';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-other-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective, NgTemplateOutlet, SafePipe],
  templateUrl: './other-projects.component.html',
  styleUrls: [
    './other-projects.component.scss',
    '../../utils/project-card-style.scss',
  ],
})
export class OtherProjectsComponent {
  /** Modal manager service for opening project details. */
  private modal = inject(ModalService);
  private injector = inject(INJECTOR);
  
  /** Array of project items. */
  public readonly items: ({ type: string } & ProjectDetails)[] = [
    PROJECT_PRO_IMAGE_EDITOR,
    PROJECT_WAIO,
    PROJECT_NGX_SCROLL_ANIMATIONS,
    PROJECT_NGX_IMAGE_HERO,
    PROJECT_COUNT_ANIMATION,
    PROJECT_SMART_HOME,
  ];

  /**
   * Opens the project details modal.
   * @param item The project item to display details for.
   */
  public openProject(item: ProjectDetails) {
    this.modal.open<ProjectDetailsComponent, ProjectDetails>(
      ProjectDetailsComponent,
      {
        data: item,
        injector: this.injector,
      },
    );
  }
}
