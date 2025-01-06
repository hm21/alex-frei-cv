import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { RecommendedPagesComponent } from 'src/app/shared/components/recommended-pages/recommended-pages.component';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { ResumeSkillsComponent } from './components/resume-skills/resume-skills.component';
import { ResumeTimelineComponent } from './components/resume-timeline/resume-timeline.component';

@Component({
  selector: 'af-resume',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RecommendedPagesComponent,
    ResumeTimelineComponent,
    ResumeSkillsComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent extends ExtendedComponent implements OnInit {
  /** Manages modals */
  private modal = inject(ModalService);

  protected override pageMeta: PageMetaData = {
    title: $localize`Resume Alex Frei`,
    description: $localize`Take a look on the resume from Alex Frei.`,
  };
  override ngOnInit(): void {
    this.classList.add('page-padding');

    /// Ensure there are no scrollbar offset issues when open the modal
    this.modal.onChangeState$.pipe(this.destroyPipe()).subscribe((res) => {
      if (res === 'open' && this.modal.isScrollbarVisible && !this.screen.xs) {
        this.elRef.nativeElement.style.marginRight = `${this.modal.scrollbarWidth}px`;
      } else if (res === 'close') {
        this.elRef.nativeElement.style.removeProperty('margin-right');
      }
    });

    super.ngOnInit();
  }
}
