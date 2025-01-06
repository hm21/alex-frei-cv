import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { PROJECT_PRO_IMAGE_EDITOR } from '../../../../shared/constants/projects/project-pro_image_editor.constants';
import { PROJECT_WAIO } from '../../../../shared/constants/projects/project-waio.constants';
import { PROJECT_COUNT_ANIMATION } from '../../../../shared/constants/projects/project_ngx-count-animation.constants';
import { PROJECT_NGX_IMAGE_HERO } from '../../../../shared/constants/projects/project_ngx-image-hero.constants';
import { PROJECT_NGX_SCROLL_ANIMATIONS } from '../../../../shared/constants/projects/project_ngx-scroll-animations.constants';
import { PROJECT_SMART_HOME } from '../../../../shared/constants/projects/project_smarthome.constants';
import { ProjectDetails } from '../../interfaces/portfolio.interfaces';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-other-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective, SafePipe],
  templateUrl: './other-projects.component.html',
  styleUrls: [
    './other-projects.component.scss',
    '../../styles/project-card.style.scss',
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
