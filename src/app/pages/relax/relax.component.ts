import { Component } from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';

@Component({
  selector: 'af-relax',
  standalone: true,
  imports: [RecommendedPagesComponent],
  templateUrl: './relax.component.html',
  styleUrl: './relax.component.scss',
})
export class RelaxComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI = {
    title: $localize`Time to relax and play`,
    description: $localize`Let's play a mini-game to relax a bit!`,
  };
}
