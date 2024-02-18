import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  inject
} from '@angular/core';
import { concatMap, filter, interval, map, timer } from 'rxjs';
import { ScreenService } from 'src/app/services/screen.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-typewriter',
  template: '',
  styleUrls: ['./typewriter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TypewriterComponent
  extends ExtendedComponent
  implements AfterViewInit
{
  @Input({ required: true }) items: string[] = [];

  private zone = inject(NgZone);
  private screen = inject(ScreenService);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.animateText();
  }

  private animateText(): void {
    let text = '';
    const arr = this.items;
    let lastIndex = 0;
    let breakH = 0;
    let breakEndH = 0;
    let speed = 100;

    this.zone.runOutsideAngular(() => {
      interval(50)
        .pipe(
          this.destroyPipe(),
          concatMap(() => timer(speed)),
          filter(() => this.isElementVisible()),
          map(() => {
            if (text.length < arr[lastIndex].length && !breakH) {
              speed = 100;
              return arr[lastIndex].substring(0, text.length + 1);
            } else if (breakH < 15) {
              if (!this.elRef.nativeElement.classList.contains('blink')) {
                this.elRef.nativeElement.classList.add('blink');
              }
              breakH++;
            } else if (text.length > 0) {
              speed = 40;
              if (this.elRef.nativeElement.classList.contains('blink')) {
                this.elRef.nativeElement.classList.remove('blink');
              }
              return arr[lastIndex].substring(0, text.length - 1);
            } else if (breakEndH < 4) {
              breakEndH++;
            } else {
              breakH = 0;
              breakEndH = 0;
              lastIndex++;
              if (lastIndex >= arr.length) {
                lastIndex = 0;
              }
              return '';
            }
            return false;
          }),
          filter((v) => v !== false),
          map((val) => val.toString()),
        )
        .subscribe((val) => {
          text = val;
          this.elRef.nativeElement.innerHTML = val.replace(/\s/g, '&nbsp;');
        });
    });
  }

  private isElementVisible(): boolean {
    const el = this.elRef.nativeElement;
    const bounding = el.getBoundingClientRect();
    const y = bounding.top - this.screen.height;
    return y < 0 && bounding.top > -bounding.height;
  }
}
