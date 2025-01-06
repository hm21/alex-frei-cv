import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { TypewriterComponent } from 'src/app/shared/components/typewriter/typewriter.component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalService } from 'src/app/ui/modal/modal.service';
import svgSnaptabGift from 'src/assets/img/snaptab/snaptab-gift.svg';
import { PROJECT_SNAPTAB } from '../../../../shared/constants/projects/project-snaptab.constants';
import { ProjectDetails } from '../../interfaces/portfolio.interfaces';
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
    '../../styles/project-card.style.scss',
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
