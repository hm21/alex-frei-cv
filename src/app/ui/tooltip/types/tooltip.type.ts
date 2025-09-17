/**
 * Represents an individual tooltip item.
 */
export type TooltipItem = {
  /** The unique identifier for the tooltip item. */
  id: string;

  /** Indicates whether the tooltip is visible. */
  visible: boolean;

  /** The message to display within the tooltip. */
  message: string;

  /** The HTML element to which the tooltip is attached. */
  parent: HTMLElement;
};
