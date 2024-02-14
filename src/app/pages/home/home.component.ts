import { Component, OnInit } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ExtendedComponent implements OnInit {
  protected override pageMeta = {
    title: $localize`Alex Frei Lebenslauf`,
    description: $localize`Persönlicher Lebenslauf von Alex Frei`,
  };

  override ngOnInit(): void {
    this.analytics.pageVisit('Home');

    super.ngOnInit();
  }
}
