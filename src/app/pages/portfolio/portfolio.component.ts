import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
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
export class PortfolioComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI = {
    title: $localize`Portfolio Alex Frei`,
    description: $localize`Take a look at the portfolio to know more about Alex Frei`,
  };

  override ngOnInit(): void {
    this.classList.add('page-padding');
    super.ngOnInit();
  }
}
