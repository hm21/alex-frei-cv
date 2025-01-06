import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, fromEvent, take, takeUntil, tap } from 'rxjs';
import { ImagePreloaderService } from 'src/app/core/services/image-manager/image-preloader.service';

@Directive({
  selector: '[afImageLoader]',
  standalone: true,
})
export class ImageLoaderDirective implements OnInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);
  private imagePreloader = inject(ImagePreloaderService);

  public splashName = input('waves');

  ngOnInit() {
    this.setImageListener();
  }

  private setImageListener() {
    const parentElement = this.el.nativeElement.parentElement;
    if (!parentElement) return;

    // Initialize skeleton loading style
    parentElement.classList.add('skeleton-loading');

    // Create and configure frosted background element
    const frostedBackground = this.createFrostedBackground();
    parentElement.insertBefore(frostedBackground, this.el.nativeElement);

    // Create and configure frosted glass overlay
    const frostedGlass = this.createFrostedGlassOverlay();
    parentElement.appendChild(frostedGlass);

    // Handle image load and error events
    fromEvent(this.el.nativeElement, 'load')
      .pipe(
        tap(() => this.cleanUp(parentElement, frostedBackground, frostedGlass)),
        delay(200),
        take(1),
        takeUntil(fromEvent(this.el.nativeElement, 'error')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        parentElement.classList.remove('skeleton-loading', 'done');
      });
  }

  private createFrostedBackground(): HTMLDivElement {
    const frostedBackground = this.document.createElement('div');
    frostedBackground.classList.add('frosted-background');

    const frostedImage = this.document.createElement('img');
    frostedImage.src = `assets/img/splash/${this.splashName()}.${this.imagePreloader.preferredImageFormat}`;
    frostedImage.style.opacity = '0.1';

    frostedBackground.appendChild(frostedImage);
    return frostedBackground;
  }

  private createFrostedGlassOverlay(): HTMLDivElement {
    const frostedGlass = this.document.createElement('div');
    frostedGlass.classList.add('frosted-glass');
    frostedGlass.style.opacity = '0.35';
    frostedGlass.style.backgroundColor = 'rgba(152, 152, 152, 0.6)';
    return frostedGlass;
  }

  private cleanUp(
    parentElement: HTMLElement,
    frostedBackground: HTMLDivElement,
    frostedGlass: HTMLDivElement,
  ): void {
    frostedBackground.remove();
    frostedGlass.remove();
    parentElement.classList.add('done');
  }
}
