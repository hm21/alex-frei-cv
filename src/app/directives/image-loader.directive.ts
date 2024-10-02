import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, fromEvent, take, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[afImageLoader]',
  standalone: true,
})
export class ImageLoaderDirective implements OnInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const parent = this.el.nativeElement.parentElement;
    parent?.classList.add('skeleton-loading');
    this.initListener(parent);
  }

  private initListener(parent: HTMLElement | null) {
    fromEvent(this.el.nativeElement, 'load')
      .pipe(
        takeUntil(fromEvent(this.el.nativeElement, 'error')),
        takeUntilDestroyed(this.destroyRef),
        take(1),
        tap(() => {
          parent?.classList.add('done');
        }),
        delay(200),
      )
      .subscribe(() => {
        parent?.classList.remove('skeleton-loading', 'done');
      });
  }
}
