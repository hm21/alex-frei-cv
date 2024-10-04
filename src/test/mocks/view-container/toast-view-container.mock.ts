import { EventEmitter, Injectable, signal } from '@angular/core';
import { ToastI } from 'src/app/shared/toast/utils/toast-interfaces';

@Injectable()
export class MockToastViewContainerRef {
  public toastList = signal<ToastI[]>([]);

  createComponent = jasmine.createSpy('createComponent').and.returnValue({
    instance: {
      closeToast: new EventEmitter(),
      toastList: this.toastList,
      add: (toast: ToastI) => {
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
