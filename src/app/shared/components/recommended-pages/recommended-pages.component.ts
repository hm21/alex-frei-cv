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
import { NavItemId } from 'src/app/layout/header/types/nav-item-id.type';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { NAV_ITEMS } from 'src/app/shared/constants/nav-items.constants';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import svgChevronRight from 'src/assets/img/icon/chevron-right.svg';
import { CardEffectsDirective } from '../../directives/card-effects/card-effects.directive';

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
    const activeIndex = NAV_ITEMS.findIndex((e) => e.id === this.activeId());

    NAV_ITEMS
      .filter((el) => el.id !== 'contact' && el.id !== this.activeId())
      .forEach((el) => {
        if (NAV_ITEMS.findIndex((e) => e.id === el.id) > activeIndex) {
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
