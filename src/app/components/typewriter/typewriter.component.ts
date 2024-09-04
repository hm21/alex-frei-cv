import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { concatMap, filter, interval, map, timer } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-typewriter',
  template: '',
  styleUrls: ['./typewriter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypewriterComponent
  extends ExtendedComponent
  implements AfterViewInit
{
  /**
   * The items to display in the typewriter effect.
   * @required
   */
  public items = input.required<string[]>();

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.animateText();
  }

  /**
   * Animates the text in the typewriter effect.
   * @private
   */
  private animateText(): void {
    let text = '';
    const arr = this.items();
    let lastIndex = 0;
    let breakH = 0;
    let breakEndH = 0;
    let speed = 100;

    interval(50)
      .pipe(
        this.destroyPipe(),
        concatMap(() => timer(speed)),
        filter(() => this.isElementVisible()),
        map(() => {
          const length = text.length;
          const arrText = arr[lastIndex];

          if (length < arrText.length && !breakH) {
            speed = 100;
            return arrText.truncate(length + 1);
          }

          if (breakH < 15) {
            this.classList.add('blink');
            breakH++;
            return false;
          } else if (length > 0) {
            speed = 40;
            this.classList.remove('blink');
            return arrText.truncate(length - 1);
          }

          if (breakEndH < 4) {
            breakEndH++;
            return false;
          }

          breakH = 0;
          breakEndH = 0;
          lastIndex = (lastIndex + 1) % arr.length;
          return '';
        }),
        filter((v) => v !== false),
        map((val) => val.toString()),
      )
      .subscribe((val) => {
        text = val;
        this.nativeElement.innerHTML = val.replace(/\s/g, '&nbsp;');
      });
  }

  /**
   * Checks if the element is visible in the viewport.
   * @returns {boolean} true if the element is visible, false otherwise.
   * @private
   */
  private isElementVisible(): boolean {
    const bounding = this.nativeElement.getBoundingClientRect();
    const y = bounding.top - this.screen.height;
    return y < 0 && bounding.top > -bounding.height;
  }
}
