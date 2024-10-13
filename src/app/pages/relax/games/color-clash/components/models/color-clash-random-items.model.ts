import svgCircle from 'src/assets/img/game/color-clash/circle.svg';
import svgRectangle from 'src/assets/img/game/color-clash/rectangle.svg';
import svgTriangle from 'src/assets/img/game/color-clash/triangle.svg';
import { ColorClashRandomItem } from '../../utils/color-clash.interface';

export class ColorClashRandomItems {
  // SVG definitions for different shapes
  private readonly rectangleSVG = { id: 'rect', svg: svgRectangle };
  private readonly triangleSVG = { id: 'triangle', svg: svgTriangle };
  private readonly circleSVG = { id: 'circle', svg: svgCircle };
  /**
   * Inserts an element at a specific position in an array.
   * @param array - The array to insert the element into.
   * @param element - The element to insert.
   * @param position - The position to insert the element at.
   * @returns The new array with the element inserted.
   * @throws Error if the position is invalid.
   */
  private insertAtPosition<T>(array: T[], element: T, position: number): T[] {
    if (position < 0 || position > array.length) {
      throw new Error('Invalid position');
    }

    const newArray = [
      ...array.slice(0, position),
      element,
      ...array.slice(position),
    ];
    return newArray;
  }

  /**
   * Generates an array of random numbers.
   * @returns An array of random numbers.
   */
  private getRandomNumbers(): ColorClashRandomItem[] {
    const items: ColorClashRandomItem[] = [];

    while (items.length < 4) {
      const randomNumber = Math.randomNextInt(10, 1);

      if (items.findIndex((el) => el.id === randomNumber.toString()) < 0) {
        items.push({
          id: randomNumber.toString(),
          content: randomNumber,
        });
      }
    }

    return items;
  }

  /**
   * Generates an array of random symbols.
   * @returns An array of random symbols.
   */
  private getRandomSymbol(): ColorClashRandomItem[] {
    const symbolsSVG = [this.rectangleSVG, this.triangleSVG, this.circleSVG];

    const symbols: ColorClashRandomItem[] = [];

    while (symbols.length < 2) {
      const randomSymbol = symbolsSVG[Math.randomNextInt(symbolsSVG.length)];

      if (symbols.findIndex((el) => el.id === randomSymbol.id) < 0) {
        symbols.push({
          id: randomSymbol.id,
          content: randomSymbol.svg,
        });
      }
    }

    return symbols;
  }

  public generate(): ColorClashRandomItem[] {
    let items: Array<ColorClashRandomItem> = this.getRandomNumbers();

    this.getRandomSymbol().forEach((el) => {
      items = this.insertAtPosition(
        items,
        el,
        Math.randomNextInt(items.length + 1),
      );
    });

    return items;
  }
}
