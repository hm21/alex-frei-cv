import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { ToastItemComponent } from './components/toast-item/toast-item.component';
import { ToastConfig } from './interfaces/toast-interfaces';

@Component({
  selector: 'af-toast',
  standalone: true,
  imports: [ToastItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('afToast', [
      transition(
        ':enter',
        [
          style({
            opacity: 0.7,
            scale: 0.7,
            transform: 'translateY(-40px)',
            'margin-bottom': '-30px',
          }),
          animate(
            '{{duration}} ease',
            style({
              opacity: 1,
              scale: 1,
              transform: 'translateY(0px)',
              'margin-bottom': '10px',
            }),
          ),
        ],
        { params: { duration: '350ms' } },
      ),
      transition(
        ':leave',
        [
          style({
            opacity: 1,
            'min-height': 0,
            scale: 1,
            color: 'transparent',
            overflow: 'hidden',
          }),
          animate(
            '{{duration}} ease-out',
            style({
              opacity: 0,
              height: 0,
              scale: 0.5,
              'padding-top': 0,
              'padding-bottom': 0,
              'margin-bottom': '0px',
            }),
          ),
        ],
        { params: { duration: '350ms' } },
      ),
    ]),
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  public cdRef = inject(ChangeDetectorRef);

  /** List of toast notifications */
  public toastList = signal<ToastConfig[]>([]);

  /** Event emitter for closing a toast */
  public closeToast = output<ToastConfig>();

  /** Adds a toast notification to the list */
  public add(toast: ToastConfig) {
    this.toastList.update((el) => {
      el.push(toast);
      return [...el];
    });
  }

  /** Removes a toast notification by ID */
  public remove(id: string | number) {
    const i = this.toastList().findIndex((el) => el.id === id);
    if (i >= 0) {
      this.toastList.update((el) => {
        el.splice(i, 1);
        return [...el];
      });
    }
  }
}
