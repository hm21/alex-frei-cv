import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { MetaManagerService } from '../services/meta-manager/meta-manager.service';
import { PageMetaData } from '../services/meta-manager/page-meta-data.interface';
import { ScreenService } from '../services/screen/screen.service';
import { IS_BROWSER } from './providers/is-browser.provider';

@Directive() // Dummy decorator
/**
 * Abstract class representing an extended component with common functionality.
 */
export abstract class ExtendedComponent implements OnInit {
  /** Optional page metadata. */
  protected pageMeta?: PageMetaData;

  public elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public isBrowser = inject(IS_BROWSER);
  protected screen = inject(ScreenService);
  protected analytics = inject(AnalyticsService);
  protected destroyRef = inject(DestroyRef);
  protected renderer = inject(Renderer2);
  protected document = inject(DOCUMENT);
  protected metaManager = inject(MetaManagerService);

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
  public setPageMeta(data: PageMetaData): void {
    this.metaManager.generate(data);
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
  protected destroyPipe<T>() {
    return takeUntilDestroyed<T>(this.destroyRef);
  }
}
