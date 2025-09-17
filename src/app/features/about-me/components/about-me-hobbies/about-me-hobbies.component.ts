import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { HOBBIES } from 'src/app/core/constants/hobbies.constants';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { Hobbies } from './types/about-me-hobbies.type';

@Component({
  selector: 'af-about-me-hobbies',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective],
  templateUrl: './about-me-hobbies.component.html',
  styleUrl: './about-me-hobbies.component.scss',
})
export class AboutMeHobbiesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  private containerRef = viewChild.required('containerRef', {
    read: ViewContainerRef,
  });
  private itemTemplate = viewChild.required('itemTemplate', {
    read: TemplateRef<any>,
  });

  /**
   * Represents a collection of hobbies.
   *
   * @remarks
   * Each item has a title, message, and icon.
   */
  private readonly items: ReadonlyArray<Hobbies> = HOBBIES;

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.containerRef().clear();
  }

  /**
   * Creates items by iterating over the array of items and creating embedded views using the provided item template.
   */
  private createItems() {
    for (const item of this.items) {
      this.containerRef().createEmbeddedView(this.itemTemplate(), item);
    }
  }
}
