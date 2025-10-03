import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal
} from '@angular/core';
import { ToastItemComponent } from './components/toast-item/toast-item.component';
import { ToastConfig } from './interfaces/toast-interfaces';

@Component({
  selector: 'af-toast',
  standalone: true,
  imports: [ToastItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
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
