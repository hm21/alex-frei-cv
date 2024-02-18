import { Component } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-business-projects',
  standalone: true,
  imports: [NgxScrollAnimationsModule, TypewriterComponent],
  templateUrl: './business-projects.component.html',
  styleUrl: './business-projects.component.scss',
})
export class BusinessProjectsComponent extends ExtendedComponent {
  public items = [
    $localize`Company!`,
    $localize`Projects!`,
    $localize`Needs!`,
    $localize`Employees!`,
    $localize`Industry!`,
    $localize`Construction!`,
    $localize`Control!`,
  ];
}
