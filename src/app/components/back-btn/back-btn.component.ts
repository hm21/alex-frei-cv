import { Component, HostAttributeToken, inject } from '@angular/core';
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
   * @required
   */
  public path = inject(new HostAttributeToken('path'), { optional: true });
}
