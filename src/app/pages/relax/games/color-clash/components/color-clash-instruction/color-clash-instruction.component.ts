import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-color-clash-instruction',
  standalone: true,
  imports: [RouterLink, QuicklinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color-clash-instruction.component.html',
  styleUrl: './color-clash-instruction.component.scss',
})
export class ColorClashInstructionComponent
  extends ExtendedComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    this.classList.add('card');
  }
}
