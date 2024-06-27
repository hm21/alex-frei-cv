import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';
import { NavItemId, navItems } from 'src/app/layout/header/utils/nav-items';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-recommended-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    QuicklinkModule,
    RouterLink,
    NgxScrollAnimationsDirective,
    NgTemplateOutlet,
    CardEffectsDirective,
  ],
  templateUrl: './recommended-pages.component.html',
  styleUrl: './recommended-pages.component.scss',
})
export class RecommendedPagesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /**
   * Reference to the container element.
   */
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  /**
   * Reference to the item template.
   */
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  /**
   * The active navigation item ID.
   * @required
   */
  @Input({ required: true }) activeId!: NavItemId;

  /**
   * Array of items to display.
   */
  public items = [];

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  /**
   * Creates items for display.
   */
  private createItems() {
    const listBefore: any[] = [];
    const listAfter: any[] = [];
    const activeIndex = navItems.findIndex((e) => e.id === this.activeId);

    navItems
      .filter((el) => el.id !== 'contact' && el.id !== this.activeId)
      .forEach((el) => {
        if (navItems.findIndex((e) => e.id === el.id) > activeIndex) {
          listAfter.push(el);
        } else {
          listBefore.push(el);
        }
      });
    [...listAfter, ...listBefore].forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }
}
