import { TooltipItem } from "../types/tooltip.type";

/**
 * Represents the base functionality for managing tooltips.
 */
export interface TooltipBase {
  /**
   * Creates a new tooltip.
   * @param {TooltipItem} item - The tooltip item to create.
   */
  create(item: TooltipItem): void;

  /**
   * Displays the tooltip with the specified ID.
   * @param {string} id - The ID of the tooltip to show.
   */
  show(id: string): void;

  /**
   * Hides the tooltip with the specified ID.
   * @param {string} id - The ID of the tooltip to hide.
   */
  hide(id: string): void;

  /**
   * Removes the tooltip with the specified ID.
   * @param {string} id - The ID of the tooltip to remove.
   */
  remove(id: string): void;
}

