import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { ScreenService } from 'src/app/core/services/screen/screen.service';
import { TooltipItem } from '../../types/tooltip.type';

@Component({
  selector: 'af-tooltip-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tooltip-item.component.html',
  styleUrl: './tooltip-item.component.scss',
  host: {
    '[style.top.px]': 'top()',
    '[style.left.px]': 'left()',
    '[class.visible]': 'item().visible',
    '(transitionstart)': 'onTransitionStart($event)',
  },
})
export class TooltipItemComponent implements AfterViewInit, OnDestroy {
  private screen = inject(ScreenService);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The tooltip item data to be displayed */
  public item = input.required<TooltipItem>();

  /** Tooltip's top position, dynamically calculated */
  public top = signal(0);

  /** Tooltip's left position, dynamically calculated */
  public left = signal(0);

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    // Set initial position
    this.updateTooltipPosition();

    // Initialize ResizeObserver to listen for position/size changes
    this.resizeObserver = new ResizeObserver(() => {
      this.updateTooltipPosition();
    });

    // Observe the parent element
    this.resizeObserver.observe(this.item().parent);
  }

  ngOnDestroy(): void {
    // Clean up observer when component is destroyed
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.item().parent);
    }
  }
  /**
   * Updates the tooltip position based on the parent element and screen dimensions.
   * Ensures the tooltip remains within screen boundaries.
   */
  private updateTooltipPosition(): void {
    const gap = 7;

    const el = this.elRef.nativeElement;

    // Use offsetWidth and offsetHeight for untransformed sizes
    const tooltipWidth = el.offsetWidth;
    const tooltipHeight = el.offsetHeight;

    const parentRect = this.item().parent.getBoundingClientRect();

    // Calculate vertical position
    let top = parentRect.top + parentRect.height + gap;
    if (top < 0) {
      top = gap;
    } else if (top + tooltipHeight > this.screen.height) {
      top = parentRect.top - tooltipHeight - gap;
    }

    // Calculate horizontal position
    let left = parentRect.left + parentRect.width / 2 - tooltipWidth / 2;
    if (left < 0) {
      left = gap;
    } else if (left + tooltipWidth > this.screen.width) {
      left = this.screen.width - tooltipWidth - gap;
    }

    this.top.set(top);
    this.left.set(left);
  }

  public onTransitionStart(event: TransitionEvent) {
    if (event.propertyName === 'opacity') {
      this.updateTooltipPosition();
    }
  }
}
