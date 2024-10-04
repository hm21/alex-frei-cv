import {
  ComponentRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { filter, takeWhile, timer } from 'rxjs';
import { IS_BROWSER } from 'src/app/utils/providers/is-browser.provider';
import { ToastComponent } from './toast.component';
import { ToastI } from './utils/toast-interfaces';
import { ToastType } from './utils/toast-types';

@Injectable()
export class ToastService {
  constructor() {
    if (this.isBrowser) {
      this.toastContainer =
        this.viewContainerRef.createComponent(ToastComponent);
      this.toastContainer.instance.closeToast.subscribe((toast) => {
        this.closeToast(toast);
      });
    }
  }

  /**
   * Reference to the ViewContainerRef where modal components will be inserted.
   * This is injected to provide a context for adding components dynamically.
   */
  public viewContainerRef = inject(ViewContainerRef);

  /** Indicates if the app is running in a browser environment */
  private isBrowser = inject(IS_BROWSER);

  /** Holds reference to the active toast component */
  private toastContainer!: ComponentRef<ToastComponent>;

  /** Tracks active toast IDs */
  public activeIdList: { [id: string]: number } = {};
  /** Tracks idle status of toast components */
  private idle: { [id: string]: boolean } = {};
  /** Default duration for toast display in milliseconds */
  private defaultDuration = 5_000;

  /** Generates and displays a toast notification */
  private generate(arg: GenerateToastI | string, toastType: ToastType) {
    const { message, duration, title, tap, type } =
      typeof arg === 'string'
        ? {
            message: arg,
            duration: undefined,
            title: undefined,
            tap: undefined,
            type: toastType,
          }
        : { ...arg, type: toastType };

    const id = message + type;
    if (!this.activeIdList[id]) {
      this.activeIdList[id] = 0;
    }
    this.activeIdList[id]++;

    timer(duration ?? this.defaultDuration)
      .pipe(
        takeWhile(() => !!this.activeIdList[id]),
        filter(() => {
          if (this.activeIdList[id] > 1) {
            this.activeIdList[id]--;
            return false;
          }
          return true;
        }),
      )
      .subscribe(() => {
        this.toastContainer.instance.remove(id);
        this.activeIdList[id] = 0;
      });

    if (this.activeIdList[id] > 1) return;

    this.toastContainer.instance.add({
      id,
      message,
      title,
      type,
      tap,
    } as ToastI);
  }

  /** Displays a success toast notification */
  public success({ message, title, duration, tap }: GenerateToastI): void;
  public success(message: string): void;
  public success(arg: GenerateToastI | string) {
    this.generate(arg, 'success');
  }
  /** Displays an informational toast notification */
  public info({ message, title, duration, tap }: GenerateToastI): void;
  public info(message: string): void;
  public info(arg: GenerateToastI | string) {
    this.generate(arg, 'info');
  }
  /** Displays a warning toast notification */
  public warning({ message, title, duration, tap }: GenerateToastI): void;
  public warning(message: string): void;
  public warning(arg: GenerateToastI | string) {
    this.generate(arg, 'warning');
  }
  /** Displays an error toast notification */
  public error({ message, title, duration, tap }: GenerateToastI): void;
  public error(message: string): void;
  public error(arg: GenerateToastI | string) {
    this.generate(arg, 'danger');
  }

  /** Starts a progress toast notification */
  public progress(msg?: string, id?: string, showDelay?: number) {
    const toastId = id ?? 'default';

    if (!this.activeIdList[toastId]) this.activeIdList[toastId] = 0;

    this.activeIdList[toastId]++;

    if (this.activeIdList[toastId] > 1) return;

    this.idle[toastId] = true;
    timer(showDelay ?? 1000)
      .pipe(takeWhile(() => this.idle[toastId]))
      .subscribe(() => {
        delete this.idle[toastId];
        this.toastContainer.instance.add({
          type: 'info',
          spinner: true,
          message: msg ?? $localize`Please wait...`,
          id: toastId,
        });
      });
  }
  /** Closes an active progress toast */
  public closeProgress(id?: string) {
    const toastId = id ?? 'default';

    if (!this.activeIdList[toastId]) this.activeIdList[toastId] = 0;

    this.activeIdList[toastId]--;
    if (this.activeIdList[toastId] <= 0) {
      delete this.idle[toastId];
      // Timeout for min view duration
      timer(0).subscribe(() => {
        this.toastContainer.instance.remove(toastId);
      });
      this.activeIdList[toastId] = 0;
    }
  }

  /** Closes a specific toast notification */
  public closeToast(toast: ToastI) {
    this.activeIdList[toast.id] = 0;
    if (toast.spinner) {
      this.closeProgress(toast.id.toString());
    } else {
      this.toastContainer.instance.remove(toast.id);
    }
  }
}

interface GenerateToastI {
  message: string;
  title?: string;
  duration?: number;
  tap?: any;
}
