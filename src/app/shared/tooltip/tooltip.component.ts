import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TooltipItemComponent } from './tooltip-item/tooltip-item.component';
import { TooltipBase, TooltipItem } from './utils/tooltip.interface';

@Component({
  selector: 'af-tooltip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipItemComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent implements TooltipBase {
  private cdRef = inject(ChangeDetectorRef);

  /** Collection of tooltip items managed by this component */
  public tooltips = signal<TooltipItem[]>([]);

  /**
   * Creates a new tooltip item and adds it to the tooltips collection.
   * @param {TooltipItem} item - The tooltip item to create.
   */
  create(item: TooltipItem): void {
    this.tooltips.update((el) => {
      el.push(item);
      return el;
    });
    this.cdRef.markForCheck();
  }

  /**
   * Shows a tooltip by setting its `visible` property to `true`.
   * @param {string} id - The ID of the tooltip to show.
   */
  show(id: string): void {
    this.toggle({ id, visible: true });
    this.cdRef.markForCheck();
  }

  /**
   * Hides a tooltip by setting its `visible` property to `false`.
   * @param {string} id - The ID of the tooltip to hide.
   */
  hide(id: string): void {
    this.toggle({ id, visible: false });
    this.cdRef.markForCheck();
  }

  /**
   * Removes a tooltip from the collection by its ID.
   * @param {string} id - The ID of the tooltip to remove.
   */
  remove(id: string): void {
    const i = this.tooltips().findIndex((e) => e.id === id);
    if (i >= 0) {
      this.tooltips.update((el) => {
        el.splice(i, 1);
        return el;
      });
    }
    this.cdRef.markForCheck();
  }

  /**
   * Toggles the visibility of a tooltip based on its ID.
   * If `visible` is provided, sets visibility explicitly.
   * @param {object} options - Object containing the tooltip ID and optional visibility.
   * @param {string} options.id - The ID of the tooltip to toggle.
   * @param {boolean} [options.visible] - Optional visibility state to set.
   */
  private toggle({ id, visible }: { id: string; visible?: boolean }) {
    this.tooltips.update((el) => {
      const item = el.find((e) => e.id === id);
      if (item) {
        item.visible = visible ?? !item.visible;
      }
      return el;
    });
  }
}