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
import { BusinessProjectsComponent } from './components/business-projects/business-projects.component';
import { OtherProjectsComponent } from './components/other-projects/other-projects.component';

@Component({
  selector: 'af-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RecommendedPagesComponent,
    BusinessProjectsComponent,
    OtherProjectsComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent extends ExtendedComponent implements OnInit {
  protected override pageMeta: PageMetaData = {
    title: $localize`Portfolio Alex Frei`,
    description: $localize`Take a look at the portfolio to know more about Alex Frei`,
  };

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
