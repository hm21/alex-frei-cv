import { Component } from '@angular/core';
import { RecommendedPagesComponent } from 'src/app/components/recommended-pages/recommended-pages.component';

@Component({
  selector: 'af-relax',
  standalone: true,
  imports: [RecommendedPagesComponent],
  templateUrl: './relax.component.html',
  styleUrl: './relax.component.scss',
})
export class RelaxComponent {}
