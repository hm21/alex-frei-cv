/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Directive, input, output, signal } from '@angular/core';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';

/**
 * Abstract directive that serves as a base class for modal components.
 * This class extends `ExtendedComponent` and provides the basic structure
 * and functionality required for modals, including handling data input and close events.
 *
 * @template DataT - The type of data that the modal will manage.
 */
@Directive() // Dummy decorator
export abstract class Modal<DataT> extends ExtendedComponent {
  /** Gets the project details data. */
  public data = input.required<DataT>();

  /**
   * An output event emitter that signals when the modal is closed.
   * Components that extend this base class can subscribe to `onClose` to handle
   * any logic that needs to occur when the modal is closed.
   */
  public onClose = output();

  /**
   * Closes the modal by emitting the `onClose` event.
   * This method should be called when the modal needs to be closed, triggering
   * any associated close logic in the component that instantiated the modal.
   */
  public close() {
    this.onClose.emit();
  }

  /** Duration of modal animation for fade in. */
  public readonly modalAnimationDurationIn = signal(500);
  /** Duration of modal animation for fade out. */
  public readonly modalAnimationDurationOut = signal(300);

  /** Flag indicating if modal should fade out. */
  public modalFadeOut = signal(false);

  /** Flag indicating if the hero animation is active */
  public isHeroActive = signal(false);
}
