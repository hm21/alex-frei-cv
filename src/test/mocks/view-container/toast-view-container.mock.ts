import { EventEmitter, Injectable, signal } from '@angular/core';
import { ToastConfig } from 'src/app/ui/toast/interfaces/toast-interfaces';

@Injectable()
export class MockToastViewContainerRef {
  public toastList = signal<ToastConfig[]>([]);

  createComponent = jasmine.createSpy('createComponent').and.returnValue({
    instance: {
      closeToast: new EventEmitter(),
      toastList: this.toastList,
      add: (toast: ToastConfig) => {
        this.toastList.update((el) => {
          el.push(toast);
          return el;
        });
      },
      remove: (id: string) => {
        const i = this.toastList().findIndex((el) => el.id === id);
        if (i >= 0) {
          this.toastList.update((el) => {
            el.splice(i, 1);
            return el;
          });
        }
      },
    },
  });
}
