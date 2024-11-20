import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgSnaptabGift from 'src/assets/img/snaptab/snaptab-gift.svg';
import { ProjectDetails } from '../../utils/portfolio-interfaces';
import { PROJECT_SNAPTAB } from '../../utils/projects/project-snaptab';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-business-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TypewriterComponent,
    SafePipe,
  ],
  templateUrl: './business-projects.component.html',
  styleUrls: [
    './business-projects.component.scss',
    '../../utils/project-card-style.scss',
  ],
})
export class BusinessProjectsComponent extends ExtendedComponent {
  protected readonly snaptabGift = svgSnaptabGift;

  private modal = inject(ModalService);
  private injector = inject(INJECTOR);
  /** Safe HTML representation of the logo. */
  public logo!: SafeHtml;

  /** Array of project items. */
  public items = [
    $localize`Company!`,
    $localize`Projects!`,
    $localize`Needs!`,
    $localize`Employees!`,
    $localize`Industry!`,
    $localize`Construction!`,
    $localize`Control!`,
  ];

  /** Opens the project details modal. */
  public openProject() {
    this.modal.open<ProjectDetailsComponent, ProjectDetails>(
      ProjectDetailsComponent,
      {
        data: PROJECT_SNAPTAB,
        injector: this.injector,
      },
    );
  }
}
