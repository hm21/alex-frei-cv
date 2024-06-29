import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';
import { ModalManagerService } from 'src/app/services/modal-manager/modal-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { PROJECT_SNAPTAB } from '../../utils/projects/project-snaptab';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'af-business-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgxScrollAnimationsDirective,
    TypewriterComponent,
    CardEffectsDirective,
  ],
  templateUrl: './business-projects.component.html',
  styleUrls: [
    './business-projects.component.scss',
    '../../utils/project-card-style.scss',
  ],
})
export class BusinessProjectsComponent extends ExtendedComponent {
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

  /** Modal manager service for opening project details. */
  private modalManager = inject(ModalManagerService);

  /** Opens the project details modal. */
  public openProject() {
    this.modalManager.openModal(ProjectDetailsComponent, {
      data: PROJECT_SNAPTAB,
    });
  }
}
