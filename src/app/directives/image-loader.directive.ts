import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, fromEvent, take, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[afImageLoader]',
  standalone: true,
})
export class ImageLoaderDirective implements OnInit {
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.addClass(parent, 'skeleton-loading');
    this.initListener(parent);
  }

  private initListener(parent: any) {
    fromEvent(this.el.nativeElement, 'load')
      .pipe(
        takeUntil(fromEvent(this.el.nativeElement, 'error')),
        takeUntilDestroyed(this.destroyRef),
        take(1),
        tap(() => {
          this.renderer.addClass(parent, 'done');
        }),
        delay(200),
      )
      .subscribe(() => {
        this.renderer.removeClass(parent, 'skeleton-loading');
        this.renderer.removeClass(parent, 'done');
      });
  }
}
