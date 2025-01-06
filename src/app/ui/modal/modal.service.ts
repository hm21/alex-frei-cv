import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  inject,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { IdManagerService } from 'src/app/core/services/id-manager/id-manager.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Modal } from './modal.base';
import { ModalComponent } from './modal.component';
import { MODAL_VIEW_CONTAINER_REF } from './utils/modal.provider';

/**
 * Injectable service responsible for managing the lifecycle and display of modal components.
 * The service handles the creation, opening, and closing of modals, as well as maintaining
 * a registry of currently active modals.
 */
@Injectable()
export class ModalService {
  /** Injected reference to the document object. */
  public document = inject(DOCUMENT);

  /**
   * Observable that emits the current state of the modal ('open' or 'close').
   * Can be subscribed to for reacting to modal state changes.
   */
  public onChangeState$ = new Subject<'open' | 'close'>();

  /**
   * Reference to the ViewContainerRef where modal components will be inserted.
   * This is injected to provide a context for adding components dynamically.
   */
  public viewContainerRef = inject(MODAL_VIEW_CONTAINER_REF);

  /**
   * Service for managing unique identifiers for modal components.
   * This is injected to ensure that each modal receives a unique ID.
   */
  public idManager = inject(IdManagerService);

  /** Injected logger service for logging operations. */
  private logger = inject(LoggerService);

  /** Injected flag indicating whether the application is running in a browser environment. */
  private isBrowser = inject(IS_BROWSER);

  /** Reference to the modal container component. */
  private modalContainer!: ComponentRef<ModalComponent>;

  constructor() {
    if (this.isBrowser) {
      this.modalContainer =
        this.viewContainerRef.createComponent(ModalComponent);
      this.modalContainer.instance.onClose.subscribe((id) => {
        this.close(id);
      });
    }
  }
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
      data?: DataT;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
    },
  ) {
    // Create a unique ID for the new modal component.
    const id = this.idManager.generateUniqueId();

    this.modalContainer.instance.open<ComponentT, DataT>(
      id,
      component,
      options,
    );

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
    this.modalContainer.instance.close(id);

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
    this.modalContainer.instance.clearAll();
  }

  /**
   * Indicates whether the scrollbar is visible on the body element.
   */
  public get isScrollbarVisible(): boolean {
    const element = this.document.body;
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  /**
   * Returns the width of the scrollbar in pixels.
   */
  public get scrollbarWidth(): number {
    // Create a temporary div element
    const div = this.document.createElement('div');

    // Apply styles to the div to ensure it has a scrollbar
    div.style.overflow = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';

    // Append the div to the body
    this.document.body.appendChild(div);

    // Measure the scrollbar width
    const scrollbarWidth = div.offsetWidth - div.clientWidth;

    // Remove the temporary div
    this.document.body.removeChild(div);

    return scrollbarWidth;
  }
}
