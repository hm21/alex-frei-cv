import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';

@Component({
  selector: 'af-back-btn',
  standalone: true,
  imports: [RouterLink, QuicklinkModule],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
})
export class BackBtnComponent {
  /**
   * The path to navigate back to.
   * @type {string}
   * @required
   */
  @Input({ required: true }) path!: string;
}
