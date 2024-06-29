import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalManagerService {
  /**
   * Data associated with the modal.
   */
  public modalData: any;
  /**
   * Subject for communicating modal events.
   */
  public modal$ = new Subject<ModalI>();

  /**
   * Opens a modal window.
   * @param {any} component - The component to be displayed in the modal.
   * @param {object} [d] - Additional data to be passed to the modal component.
   */
  public openModal(component: any, d?: { data: any }) {
    this.modal$.next({
      type: 'add',
      component,
    });
    this.modalData = d?.data;
  }

  /**
   * Closes the currently open modal window.
   */
  public closeModal() {
    this.modal$.next({ type: 'remove' });
    this.modalData = undefined;
  }
}

/**
 * Interface for defining modal events.
 */
interface ModalI {
  /**
   * Type of modal event ('add' or 'remove').
   * @type {'add' | 'remove'}
   */
  type: 'add' | 'remove';
  /**
   * Component to be displayed in the modal.
   * @type {any}
   */
  component?: any;
}
