import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
  input,
} from '@angular/core';
import { ThumbnailBase64Directive } from 'src/app/shared/directives/thumbnail-base64/thumbnail-base64.directive';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalService } from 'src/app/ui/modal/modal.service';
import svgIconWebsite from 'src/assets/img/icon/globalization.svg';
import svgIconView from 'src/assets/img/icon/open_in_full.svg';
import svgIconDemo from 'src/assets/img/icon/open_in_new.svg';
import svgIconGithub from 'src/assets/img/icon/social/github.svg';
import { ProjectThumbnailPipe } from '../../pipes/project-thumbnail.pipe';
import { ProjectDetails } from '../../types/project.type';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  imports: [SafePipe, ProjectThumbnailPipe, ThumbnailBase64Directive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'card-hover-shadow',
  },
})
export class ProjectCardComponent {
  /** Modal manager service for opening project details. */
  private modal = inject(ModalService);
  private injector = inject(INJECTOR);

  protected readonly iconDemo = svgIconDemo;
  protected readonly iconView = svgIconView;
  protected readonly iconGithub = svgIconGithub;
  protected readonly iconWebsite = svgIconWebsite;

  public project = input.required<ProjectDetails>();

  /**
   * Opens the project details modal.
   */
  public openProject() {
    this.modal.open<ProjectDetailsComponent, ProjectDetails>(
      ProjectDetailsComponent,
      {
        data: this.project(),
        injector: this.injector,
      },
    );
  }
}
