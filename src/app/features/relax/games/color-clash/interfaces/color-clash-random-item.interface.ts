import { ColorClashItemId } from "../components/types/color-clash.types";

/**
 * Represents a random item in the Color Clash game.
 */
export interface ColorClashRandomItem {
  id: ColorClashItemId;
  content: string | number;
}
