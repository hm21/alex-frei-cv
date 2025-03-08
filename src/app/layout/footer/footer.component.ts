import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'af-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  host: {
    class: 'af-footer',
  },
})
export class FooterComponent {}
