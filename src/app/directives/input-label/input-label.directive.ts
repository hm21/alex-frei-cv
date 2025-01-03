import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { distinctUntilChanged, fromEvent, map, merge, startWith } from 'rxjs';
import { IdManagerService } from '../../services/id-manager/id-manager.service';

@Directive({
  selector: '[afInputLabel]',
  standalone: true,
})
export class InputLabelDirective implements OnInit {
  /** The form control instance associated with this input element. */
  private ngControl = inject(NgControl);

  /** Reference to the global document object for direct DOM manipulation. */
  private document = inject(DOCUMENT);

  /** Service for generating unique IDs to ensure the label is uniquely associated with the input. */
  private idManager = inject(IdManagerService);

  /** Used to automatically clean up subscriptions when the directive is destroyed. */
  private destroyRef = inject(DestroyRef);

  /** Reference to the input element where the directive is applied. */
  private elRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /** The label text to display for the input element. */
  public label = input.required<string>();

  /** Reference to the dynamically created label element associated with the input. */
  private labelRef!: HTMLLabelElement;

  ngOnInit(): void {
    this.createLabel();
    this.setupListener();
  }

  /**
   * Sets up the label element and listens for changes in focus, blur, and validation status.
   */
  private setupListener() {
    merge(
      fromEvent(this.elRef.nativeElement, 'focus'),
      fromEvent(this.elRef.nativeElement, 'blur'),
      this.ngControl.control?.events ?? this.ngControl.statusChanges!,
    )
      .pipe(
        map(() => {
          return {
            valid: this.ngControl.valid,
            touched: this.ngControl.touched,
          };
        }),
        distinctUntilChanged(
          (pre, cur) => pre.valid === cur.valid && pre.touched === cur.touched,
        ),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.updateLabelClassList();
      });
  }

  /**
   * Creates a label element and a container around the input element.
   * Sets the initial classes and associates the label with the input element by
   * setting its `for` attribute.
   */
  private createLabel() {
    this.elRef.nativeElement.id ||=
      this.ngControl.name?.toString() ?? this.idManager.generateUniqueId();

    // Create a input box
    const container = this.document.createElement('div');
    container.classList.add('input-box');

    // Initialize the label for the input
    this.labelRef = this.document.createElement('label');
    this.labelRef.innerHTML = this.label();
    this.labelRef.htmlFor = this.elRef.nativeElement.id;
    this.labelRef.classList.add('ng-untouched');

    const input = this.elRef.nativeElement;
    const parent = this.elRef.nativeElement.parentNode;

    parent!.insertBefore(container, input);

    // Insert container in the DOM and move the input inside it
    container.appendChild(this.labelRef);
    container.appendChild(input);
  }

  /**
   * Updates the classes on the label element based on the input's validation and touched state.
   * Adds or removes classes `ng-valid`, `ng-invalid`, `ng-touched`, and `ng-untouched` based on control state.
   */
  private updateLabelClassList() {
    const control = this.ngControl;

    // Update validation classes
    this.labelRef.classList.toggle('ng-valid', control.valid ?? true);
    this.labelRef.classList.toggle('ng-invalid', control.invalid ?? false);

    // Update touched state classes
    this.labelRef.classList.toggle('ng-touched', control.touched ?? false);
    this.labelRef.classList.toggle('ng-untouched', control.untouched ?? true);
  }
}
