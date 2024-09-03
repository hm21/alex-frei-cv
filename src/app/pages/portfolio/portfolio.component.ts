import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ModalManagerService } from 'src/app/services/modal-manager/modal-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
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

  private modalManager = inject(ModalManagerService);

  override ngOnInit(): void {
    this.classList.add('page-padding');

    /// Ensure there are no scrollbar offset issues when open the modal
    this.modalManager.modal$.pipe(this.destroyPipe()).subscribe((res) => {
      if (res.type === 'add' && this.isScrollbarVisible && !this.screen.xs) {
        this.renderer.setStyle(
          this.elRef.nativeElement,
          'margin-right',
          `${this.scrollbarWidth}px`,
        );
      } else if (res.type === 'remove') {
        this.renderer.removeStyle(this.elRef.nativeElement, 'margin-right');
      }
    });

    super.ngOnInit();
  }
  private get isScrollbarVisible(): boolean {
    const element = this.document.body;
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
  private get scrollbarWidth(): number {
    // Create a temporary div element
    const div = this.document.createElement('div');

    // Apply styles to the div to ensure it has a scrollbar
    div.style.overflow = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';

    // Append the div to the body
    this.document.body.appendChild(div);

    // Measure the scrollbar width
    const scrollbarWidth = div.offsetWidth - div.clientWidth;

    // Remove the temporary div
    this.document.body.removeChild(div);

    return scrollbarWidth;
  }
}
