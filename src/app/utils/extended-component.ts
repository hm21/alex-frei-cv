import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { IS_BROWSER } from './global-tokens';
import { MetaDataI, metaGenerator } from './meta-generator';

@Directive() // Dummy decorator
/**
 * Abstract class representing an extended component with common functionality.
 */
export abstract class ExtendedComponent implements OnInit {
  /** Optional page metadata. */
  protected pageMeta?: MetaDataI;

  public elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public isBrowser = inject(IS_BROWSER);
  protected analytics = inject(AnalyticsService);
  protected destroyRef = inject(DestroyRef);
  private titleRef = inject(Title);
  private metaRef = inject(Meta);
  protected ngZone = inject(NgZone);
  protected cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initComponent();
  }

  /**
   * Initializes the component by setting attributes based on the native element.
   * @private
   */
  private initComponent(): void {
    const tag = this.nativeElement.tagName.toLowerCase();

    // Set component data
    this.classList.add(tag);
    if (!this.nativeElement.id) {
      this.nativeElement.id = tag;
    }

    // Set page metadata
    if (this.pageMeta) {
      this.setPageMeta(this.pageMeta);
    }
  }

  /**
   * Sets the page meta tags using the provided data.
   * @param data - The metadata information.
   * @public
   */
  public setPageMeta(data: MetaDataI): void {
    metaGenerator({
      ...data,
      titleC: this.titleRef,
      metaC: this.metaRef,
    });
  }

  /**
   * Returns the native element of the component.
   * @public
   */
  public get nativeElement() {
    return this.elRef.nativeElement;
  }

  /**
   * Returns the class list of the native element.
   * @public
   */
  public get classList() {
    return this.nativeElement.classList;
  }

  /**
   * Returns an Observable that completes when the component is destroyed.
   * @protected
   * @returns An Observable that completes when the component is destroyed.
   */
  protected destroyPipe() {
    return takeUntilDestroyed(this.destroyRef);
  }
}
