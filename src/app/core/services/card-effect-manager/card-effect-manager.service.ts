import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  delay,
  filter,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { ScreenService } from '../screen/screen.service';

@Injectable({
  providedIn: 'root',
})
export class CardEffectManagerService {
  private stopRandomInterval$ = new Subject<void>();
  public activeAnimation$ = new BehaviorSubject(false);

  public readonly delayBetweenAnimations = 1_500;
  private minRandomDelay = 6_000;
  private maxRandomDelay = 10_000;
  private lastTriggeredId = '';

  private animationItems: AnimationElement[] = [];

  private screen = inject(ScreenService);

  /**
   * Adds an animation element to the list.
   * @param {AnimationElement} item - The animation element to add.
   */
  public addElement(item: AnimationElement) {
    if (Object.keys(this.animationItems).isEmpty) {
      this.initRandom();
    }
    this.animationItems.push(item);
  }
  /**
   * Removes an animation element from the list.
   * @param {AnimationElement} item - The animation element to remove.
   */
  public removeElement(item: AnimationElement) {
    const index = this.animationItems.findIndex((el) => el.id === item.id);
    this.animationItems.removeByIndex(index);
    if (Object.keys(this.animationItems).isEmpty) {
      this.stopRandomInterval$.next();
    }
  }

  /**
   * Initializes the random animation triggering.
   */
  private initRandom() {
    /**
     * Generates a random interval between the given min and max values.
     * @param {number} min - The minimum value for the interval.
     * @param {number} max - The maximum value for the interval.
     * @returns {number} - A random interval between min and max.
     */
    function getRandomInterval(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    of()
      .pipe(
        takeUntil(this.stopRandomInterval$),
        startWith(0),
        switchMap(() => {
          const delay = getRandomInterval(
            this.minRandomDelay,
            this.maxRandomDelay,
          );

          return timer(0, delay).pipe(takeUntil(this.stopRandomInterval$));
        }),
        map(() =>
          this.animationItems.filter(
            (el) =>
              this.isElementVisible(el.element) &&
              (el.id !== this.lastTriggeredId ||
                this.animationItems.length === 1),
          ),
        ),
        filter(
          (filteredItems) =>
            filteredItems.isNotEmpty && !this.activeAnimation$.value,
        ),
        map(
          (filteredItems) =>
            filteredItems[Math.randomNextInt(filteredItems.length)],
        ),
        tap((el) => {
          this.lastTriggeredId = el.id;
          this.activeAnimation$.next(true);
          el.callback(true);
        }),
        delay(this.delayBetweenAnimations),
        tap((el) => {
          this.activeAnimation$.next(false);
          el.callback(false);
        }),
      )
      .subscribe(() => {});
  }

  /**
   * Checks if the element is visible in the viewport.
   * @returns {boolean} true if the element is visible, false otherwise.
   * @private
   */
  private isElementVisible(elementRef: HTMLElement): boolean {
    const bounding = elementRef.getBoundingClientRect();
    const y = bounding.top - this.screen.height;
    return y < 0 && bounding.top > -bounding.height;
  }
}

export type AnimationElement = {
  id: string;
  element: HTMLElement;
  callback: (addClass: boolean) => any;
};
