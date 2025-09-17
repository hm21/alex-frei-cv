import { ComponentRef, inject, Injectable } from '@angular/core';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { TooltipBase } from '../interfaces/tooltip.interface';
import { TOOLTIP_VIEW_CONTAINER_REF } from '../providers/tooltip.provider';
import { TooltipComponent } from '../tooltip.component';
import { TooltipItem } from '../types/tooltip.type';

@Injectable()
export class TooltipService implements TooltipBase {
  /**
   * Reference to the ViewContainerRef where tooltip components will be inserted.
   * This is injected to provide a context for adding components dynamically.
   */
  public viewContainerRef = inject(TOOLTIP_VIEW_CONTAINER_REF);

  private isBrowser = inject(IS_BROWSER);

  /** Reference to the dynamically created TooltipComponent instance */
  private tooltipContainer!: ComponentRef<TooltipComponent>;

  constructor() {
    if (this.isBrowser) {
      this.tooltipContainer =
        this.viewContainerRef.createComponent(TooltipComponent);
    }
  }

  /**
   * Creates a new tooltip by delegating to the TooltipComponent.
   * @param {TooltipItem} item - The tooltip item to create.
   */
  public create(item: TooltipItem) {
    if (!this.isBrowser) return;
    this.tooltipContainer.instance.create(item);
  }

  /**
   * Shows a tooltip by its ID.
   * @param {string} id - The ID of the tooltip to show.
   */
  public show(id: string) {
    this.tooltipContainer.instance.show(id);
  }

  /**
   * Hides a tooltip by its ID.
   * @param {string} id - The ID of the tooltip to hide.
   */
  public hide(id: string) {
    this.tooltipContainer.instance.hide(id);
  }

  /**
   * Removes a tooltip by its ID.
   * @param {string} id - The ID of the tooltip to remove.
   */
  public remove(id: string) {
    if (!this.isBrowser) return;
    this.tooltipContainer.instance.remove(id);
  }
}
