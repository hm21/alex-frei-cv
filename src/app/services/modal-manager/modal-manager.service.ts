import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  inject,
  Injectable,
  Injector,
  NgModuleRef,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from 'src/app/utils/modal/modal.component';
import { IdManagerService } from '../id-manager/id-manager.service';
import { LoggerService } from '../logger/logger.service';

/**
 * Injectable service responsible for managing the lifecycle and display of modal components.
 * The service handles the creation, opening, and closing of modals, as well as maintaining
 * a registry of currently active modals.
 */
@Injectable()
export class ModalManager {
  /**
   * A collection of active modal components along with their unique identifiers.
   */
  private _components: {
    id: string;
    component: ComponentRef<any>;
  }[] = [];

  /**
   * Observable that emits the current state of the modal ('open' or 'close').
   * Can be subscribed to for reacting to modal state changes.
   */
  public onChangeState$ = new Subject<'open' | 'close'>();

  /**
   * Reference to the ViewContainerRef where modal components will be inserted.
   * This is injected to provide a context for adding components dynamically.
   */
  public viewContainerRef = inject(ViewContainerRef);

  /**
   * Service for managing unique identifiers for modal components.
   * This is injected to ensure that each modal receives a unique ID.
   */
  public idManager = inject(IdManagerService);

  /**
   * Renderer2 instance used to manipulate the DOM, such as setting styles
   * on the document body when a modal is opened or closed.
   */
  private renderer = inject(Renderer2);

  /**
   * Reference to the global `document` object, used for DOM manipulations.
   */
  private document = inject(DOCUMENT);

  /** Injected logger service for logging operations. */
  private logger = inject(LoggerService);

  /**
   * Opens a modal component dynamically.
   *
   * @template ComponentT - The type of the modal component to be opened.
   * @template DataT - The type of data to be passed to the modal.
   *
   * @param component - The component type of the modal to be opened.
   * @param options.data - Optional data to be passed to the modal component.
   * @param options.injector - Optional custom injector to use for the modal component.
   * @param options.ngModuleRef - Optional reference to an NgModule to use for the modal component.
   *
   * @returns void
   */
  public open<ComponentT extends Modal<DataT>, DataT>(
    component: Type<ComponentT>,
    options?: {
      data?: any;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
    },
  ) {
    const { data, injector, ngModuleRef } = options || {};

    // Create a unique ID for the new modal component.
    const id = this.idManager.generateUniqueId();

    // Hide the default browser scrollbar to prevent background scrolling.
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');

    // Create the modal component and inject it into the view.
    const cmp = this.viewContainerRef.createComponent<ComponentT>(component, {
      injector: injector,
      ngModuleRef: ngModuleRef,
    });
    cmp.setInput('data', data);
    cmp.instance.onClose.subscribe(() => {
      this.close(id);
      // Restore the scrollbar visibility when the modal is closed.
      this.renderer.removeStyle(this.document.body, 'overflow');
    });

    // Register the newly created modal component in the internal registry.
    this._components.push({
      id,
      component: cmp,
    });

    // Notify observers that a modal has been opened.
    this.onChangeState$.next('open');

    this.logger.info(`Open modal ${id}`).print();
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
    this.viewContainerRef.remove(i);
    this._components.splice(i, 1);

    // Notify observers that a modal has been closed.
    this.onChangeState$.next('close');

    this.logger.info(`Close modal ${id}`).print();
  }

  /**
   * Closes all currently active modal components.
   *
   * @returns void
   */
  public clearAll() {
    // Iterate through the list of active modals and close each one.
    this._components.forEach((el) => {
      this.close(el.id);
    });
  }
}
