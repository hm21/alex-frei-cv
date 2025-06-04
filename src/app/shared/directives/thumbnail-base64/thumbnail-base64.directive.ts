import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, fromEvent, map, of, take, tap } from 'rxjs';

/**
 * A directive that applies a base64-encoded thumbnail as a background image
 * on a `<picture>` element until the actual `<img>` inside it finishes loading.
 *
 * Once the image is loaded, it fades in over the background.
 */
@Directive({
  selector: '[afThumbnailBase64]',
})
export class ThumbnailBase64Directive implements OnInit {
  /**
   * Injects a reference to the host element, expected to be a `<picture>` element.
   */
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Injects Angular's destroy lifecycle hook for automatic unsubscription.
   */
  private destroyRef = inject(DestroyRef);

  /**
   * Duration (in milliseconds) for the image fade-in transition.
   */
  private readonly fadeDurationMs = 300;

  /**
   * The base64-encoded thumbnail to show as the background image.
   */
  public backgroundImage = input.required<string>({
    alias: 'afThumbnailBase64',
  });

  /**
   * Gets the host element as an `HTMLPictureElement`.
   * Throws if the host is not a `<picture>` tag.
   */
  private get pictureRef(): HTMLPictureElement {
    return this.elRef.nativeElement as HTMLPictureElement;
  }

  /**
   * Lifecycle hook that validates the host and sets up the visual behavior.
   */
  ngOnInit(): void {
    if (this.pictureRef.tagName.toLowerCase() !== 'picture') {
      throw new Error('Expected a <picture> element as host.');
    }

    this.setupStyles();
    this.listenImgLoad();
  }

  /**
   * Sets up initial styles on the `<picture>` and `<img>` elements.
   * - Applies the base64 thumbnail as a background.
   * - Hides the `<img>` with `opacity: 0` and sets up the fade-in transition.
   */
  private setupStyles() {
    const picture = this.pictureRef;
    const img = picture.querySelector('img');
    if (!img) {
      throw new Error('No <img> element found inside the <picture> element.');
    }

    // Setup picture styles
    picture.style.display = 'block';
    picture.style.width = '100%';
    picture.style.height = '100%';
    picture.style.backgroundRepeat = 'no-repeat';
    picture.style.backgroundSize = 'cover';
    picture.style.backgroundPosition = 'center';
    picture.style.backgroundImage = this.backgroundImage();

    // Setup img styles
    img.style.transition = `opacity ${this.fadeDurationMs}ms ease`;
    img.style.opacity = '0';
  }

  /**
   * Waits for the `<img>` to load, then fades it in and removes the background image.
   * Uses RxJS to handle both cached and uncached loading.
   */
  private listenImgLoad() {
    const img = this.pictureRef.querySelector('img');
    if (!img) return;

    const isCached = img.complete && img.naturalHeight !== 0;

    const imageLoad$ = isCached
      ? of(true)
      : fromEvent(img, 'load').pipe(
          take(1),
          map(() => true),
        );

    const timestamp = Date.now();

    imageLoad$
      .pipe(
        tap(() => {
          const loadDuration = Date.now() - timestamp;

          // If image was instantly available (cached), remove transition
          if (loadDuration < 30) {
            img.style.removeProperty('transition');
          }

          // Reveal the image
          img.style.opacity = '1';
        }),
        // Wait for fade-in animation to complete before removing background
        delay(this.fadeDurationMs + 100),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const style = this.pictureRef.style;
        style.removeProperty('background-image');
        style.removeProperty('background-size');
        style.removeProperty('background-position');
        style.removeProperty('background-repeat');
      });
  }
}
