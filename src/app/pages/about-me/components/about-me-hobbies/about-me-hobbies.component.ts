import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-about-me-hobbies',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgTemplateOutlet],
  templateUrl: './about-me-hobbies.component.html',
  styleUrl: './about-me-hobbies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeHobbiesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  /**
   * Represents a collection of hobbies.
   *
   * @remarks
   * Each item has a title, message, and icon.
   */
  public items: {
    /**
     * The title of the item.
     */
    title: string;
    /**
     * The message of the item.
     */
    message: string;
    /**
     * The icon of the item.
     */
    icon: string;
  }[] = [
    {
      title: $localize`Hiking`,
      message: $localize`I'm the one who loves the silence of the wilderness, follows the call of the birds and experiences nature as his own symphony.`,
      icon: 'hiking',
    },
    {
      title: $localize`Swiming`,
      message: $localize`What could be more relaxing than a refreshing swim? And swimming counts as exercise, so it's the perfect win-win for body and mind.`,
      icon: 'swim',
    },
    /*   {
      title: $localize`Travel`,
      message: $localize`I love to travel and explore new places, meet new people and learn about different cultures. I'm always ready for a new adventure.`,
      icon: 'travel',
    }, */
    {
      title: $localize`Develop`,
      message: $localize`As electronics enthusiast i spend my free time drawing schematics, writing code and turning my apartment into a high-tech lab.`,
      icon: 'develop',
    },
  ];

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  /**
   * Creates items by iterating over the array of items and creating embedded views using the provided item template.
   */
  private createItems() {
    this.items.forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }
}
