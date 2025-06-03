import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
  input,
} from '@angular/core';
import { ImageLoaderDirective } from 'src/app/shared/directives/image-loader/image-loader.directive';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalService } from 'src/app/ui/modal/modal.service';
import svgIconWebsite from 'src/assets/img/icon/globalization.svg';
import svgIconView from 'src/assets/img/icon/open_in_full.svg';
import svgIconDemo from 'src/assets/img/icon/open_in_new.svg';
import svgIconGithub from 'src/assets/img/icon/social/github.svg';
import { ProjectDetails } from '../../interfaces/portfolio.interfaces';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  imports: [SafePipe, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
