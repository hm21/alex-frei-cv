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

/**
 * Represents an individual tooltip item.
 */
export interface TooltipItem {
  /** The unique identifier for the tooltip item. */
  id: string;

  /** Indicates whether the tooltip is visible. */
  visible: boolean;

  /** The message to display within the tooltip. */
  message: string;

  /** The HTML element to which the tooltip is attached. */
  parent: HTMLElement;
}
