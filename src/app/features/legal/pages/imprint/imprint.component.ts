import { Component } from '@angular/core';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';

@Component({
  selector: 'af-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  standalone: true,
})
export class ImprintComponent extends ExtendedComponent {
  protected override pageMeta: PageMetaData = {
    title: `Imprint Alex Frei`,
    description: `Imprint from the CV from Alex Frei`,
  };
}
