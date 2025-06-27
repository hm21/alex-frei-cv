import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { RecommendedPagesComponent } from 'src/app/shared/components/recommended-pages/recommended-pages.component';
import { PROJECT_PRO_IMAGE_EDITOR } from 'src/app/shared/constants/projects/project-pro_image_editor.constants';
import { PROJECT_PRO_VIDEO_EDITOR } from 'src/app/shared/constants/projects/project-pro_video_editor.constants';
import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { PROJECT_WAIO } from 'src/app/shared/constants/projects/project-waio.constants';
import { PROJECT_COUNT_ANIMATION } from 'src/app/shared/constants/projects/project_ngx-count-animation.constants';
import { PROJECT_NGX_IMAGE_HERO } from 'src/app/shared/constants/projects/project_ngx-image-hero.constants';
import { PROJECT_NGX_SCROLL_ANIMATIONS } from 'src/app/shared/constants/projects/project_ngx-scroll-animations.constants';
import { PROJECT_SMART_HOME } from 'src/app/shared/constants/projects/project_smarthome.constants';
import { PROJECT_UMAMIHOUSE } from 'src/app/shared/constants/projects/project_umamihouse';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetails } from './types/project.type';

@Component({
  selector: 'af-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgxScrollAnimationsDirective,
    ProjectCardComponent,
    RecommendedPagesComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  host: {
    class: 'page-container',
  },
})
export class PortfolioComponent extends ExtendedComponent implements OnInit {
  protected override pageMeta: PageMetaData = {
    title: $localize`Portfolio Alex Frei`,
    description: $localize`Take a look at the portfolio to know more about Alex Frei`,
  };

  public readonly projects: ReadonlyArray<ProjectDetails> = [
    PROJECT_SNAPTAB,
    PROJECT_PRO_IMAGE_EDITOR,
    PROJECT_PRO_VIDEO_EDITOR,
    PROJECT_UMAMIHOUSE,
    PROJECT_SMART_HOME,
    PROJECT_NGX_SCROLL_ANIMATIONS,
    PROJECT_NGX_IMAGE_HERO,
    PROJECT_COUNT_ANIMATION,
    PROJECT_WAIO,
  ];

  /** Manages modals */
  private modal = inject(ModalService);

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
