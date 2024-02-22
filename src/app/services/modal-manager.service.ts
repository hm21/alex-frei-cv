import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalManagerService {
  public modalData: any;

  public modal$ = new Subject<ModalI>();


  public openModal(component: any, d?: { data: any }) {
    this.modal$.next({
      type: 'add',
      component,
    });
    this.modalData = d?.data;
  }
  public closeModal() {
    this.modal$.next({ type: 'remove' });
    this.modalData = undefined;
  }
}

interface ModalI {
  type: 'add' | 'remove';
  component?: any;
}
