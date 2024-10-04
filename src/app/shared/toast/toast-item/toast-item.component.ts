import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ToastI } from '../utils/toast-interfaces';

@Component({
  selector: 'af-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ProgressSpinnerComponent],
  host: {
    '[class.has-title]': 'toast().title',
  },
})
export class ToastItemComponent extends ExtendedComponent implements OnInit {
  public cdRef = inject(ChangeDetectorRef);

  public toast = input.required<ToastI>();
  public toastContent =
    viewChild.required<ElementRef<HTMLElement>>('toastContent');

  /** Initializes component settings and styles */
  override ngOnInit(): void {
    this.setStyles();

    super.ngOnInit();
  }
  /** Sets styles for toast and creates accent background */
  private setStyles() {
    const color = `var(--color-${this.toast().type ?? 'success'})`;
    this.elRef.nativeElement.style.color = color;
    this.elRef.nativeElement.style.borderColor = color;

    const accentBackground = this.document.createElement('div');
    accentBackground.style.background = color;
    accentBackground.style.position = 'absolute';
    accentBackground.style.top = '0px';
    accentBackground.style.left = '0px';
    accentBackground.style.right = '0px';
    accentBackground.style.bottom = '0px';
    accentBackground.style.bottom = '0px';
    accentBackground.style.opacity = '0.05';

    this.nativeElement.insertBefore(
      accentBackground,
      this.toastContent().nativeElement,
    );
  }
}
