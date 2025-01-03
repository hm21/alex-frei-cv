import { DOCUMENT } from '@angular/common';
import {
  Component,
  ComponentRef,
  inject,
  Injector,
  NgModuleRef,
  output,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Modal } from './modal.base';

@Component({
  selector: 'af-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  /**
   * A collection of active modal components along with their unique identifiers.
   */
  private _components: {
    id: string;
    component: ComponentRef<any>;
  }[] = [];

  private containerRef = viewChild.required('containerRef', {
    read: ViewContainerRef,
  });

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public onClose = output<string>();

  /**
   * Reference to the global `document` object, used for DOM manipulations.
   */
  private document = inject(DOCUMENT);

  public open<ComponentT extends Modal<DataT>, DataT>(
    id: string,
    component: Type<ComponentT>,
    options?: {
      data?: any;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
    },
  ) {
    const { data, injector, ngModuleRef } = options || {};

    // Hide the default browser scrollbar to prevent background scrolling.
    this.document.body.style.overflow = 'hidden';

    // Create the modal component and inject it into the view.
    const cmp = this.containerRef().createComponent<ComponentT>(component, {
      injector: injector,
      ngModuleRef: ngModuleRef,
    });
    cmp.instance.classList.add('modal');
    cmp.setInput('data', data);
    cmp.instance.onClose.subscribe(() => {
      this.onClose.emit(id);
    });

    // Register the newly created modal component in the internal registry.
    this._components.push({
      id,
      component: cmp,
    });
  }

  /**
   * Closes a modal component.
   *
   * @param id - The unique identifier of the modal to be closed. If not provided, the last opened modal will be closed.
   *
   * @returns void
   */
  public close(id?: string) {
    // If no ID is provided, close the last modal in the list.
    id ??= this._components.getLastItem()!.id;

    // Find the index of the modal to be closed.
    const i = this._components.findIndex((el) => el.id === id);

    // Remove the modal component from the view and the registry.
    this.containerRef().remove(i);
    this._components.splice(i, 1);

    // Restore the scrollbar visibility when the modal is closed.
    this.document.body.style.removeProperty('overflow');
  }

  /**
   * Closes all currently active modal components.
   *
   * @returns void
   */
  public clearAll() {
    // Iterate through the list of active modals and close each one.
    this._components
      .map((el) => el.id)
      .forEach((id) => {
        this.close(id);
      });
  }
}
