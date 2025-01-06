import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { HOBBIES } from 'src/app/shared/constants/hobbies.constants';
import { Hobbies } from './interfaces/about-me-hobbies-interface';

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
  private readonly items: Hobbies[] = HOBBIES;

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
    this.items.forEach((item) => {
      this.containerRef().createEmbeddedView(this.itemTemplate(), item);
    });
  }
}
