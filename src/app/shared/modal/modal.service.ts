import {
  ComponentRef,
  inject,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from 'src/app/shared/modal/modal.base';
import { IS_BROWSER } from 'src/app/utils/providers/is-browser.provider';
import { IdManagerService } from '../../services/id-manager/id-manager.service';
import { LoggerService } from '../../services/logger/logger.service';
import { ModalComponent } from './modal.component';

/**
 * Injectable service responsible for managing the lifecycle and display of modal components.
 * The service handles the creation, opening, and closing of modals, as well as maintaining
 * a registry of currently active modals.
 */
@Injectable()
export class ModalService {
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

  /** Injected logger service for logging operations. */
  private logger = inject(LoggerService);

  private isBrowser = inject(IS_BROWSER);

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
      data?: any;
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
}
