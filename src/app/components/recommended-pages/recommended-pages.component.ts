import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';
import { NavItemId, navItems } from 'src/app/layout/header/utils/nav-items';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';

@Component({
  selector: 'af-recommended-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    QuicklinkDirective,
    RouterLink,
    NgxScrollAnimationsDirective,
    NgTemplateOutlet,
    CardEffectsDirective,
    SafePipe,
  ],
  templateUrl: './recommended-pages.component.html',
  styleUrl: './recommended-pages.component.scss',
})
export class RecommendedPagesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  protected readonly chevronRight = svgChevronRight;

  /**
   * Reference to the container element.
   */
  private container = viewChild.required('containerRef', {
    read: ViewContainerRef,
  });

  /**
   * Reference to the item template.
   */
  private itemTemplate = viewChild.required('itemTemplate', {
    read: TemplateRef<any>,
  });

  /**
   * The active navigation item ID.
   * @required
   */
  public activeId = input.required<NavItemId>();

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container().clear();
  }

  /**
   * Creates items for display.
   */
  private createItems() {
    const listBefore: any[] = [];
    const listAfter: any[] = [];
    const activeIndex = navItems.findIndex((e) => e.id === this.activeId());

    navItems
      .filter((el) => el.id !== 'contact' && el.id !== this.activeId())
      .forEach((el) => {
        if (navItems.findIndex((e) => e.id === el.id) > activeIndex) {
          listAfter.push(el);
        } else {
          listBefore.push(el);
        }
      });
    [...listAfter, ...listBefore].forEach((item) => {
      this.container().createEmbeddedView(this.itemTemplate(), item);
    });
  }
}
