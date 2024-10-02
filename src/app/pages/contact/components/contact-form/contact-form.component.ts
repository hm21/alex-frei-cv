import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  CONTACT_EMAIL,
  CONTACT_MESSAGES,
} from 'src/app/configs/contact-options';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ExtendedValidators } from 'src/app/utils/extended-form-validators';
import { ENDPOINTS } from 'src/app/utils/providers/endpoints/endpoints.provider';

@Component({
  selector: 'af-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DecimalPipe, AsyncPipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent extends ExtendedComponent implements OnInit {
  /** The reactive form group for the contact form. */
  public form = new FormGroup({
    givenName: new FormControl('', ExtendedValidators.requiredNonWhitespace),
    familyName: new FormControl('', ExtendedValidators.requiredNonWhitespace),
    message: new FormControl('', ExtendedValidators.requiredNonWhitespace),
    email: new FormControl('', [ExtendedValidators.email]),
  });

  /** Subject that triggers the form submission. */
  public submit$ = new Subject<void>();

  /** Observable that tracks the form state and related messages. */
  public formState = signal<{
    state: 'success' | 'error' | 'loading' | '';
    message?: string;
    canSend: boolean;
  }>({
    state: '',
    canSend: true,
  });

  /** Number of times the form submission has been attempted. */
  private sendTries = 0;

  private http = inject(HttpClient);
  private endpoints = inject(ENDPOINTS);

  override ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        map(() => this.formState()),
        filter((el) => el.state === 'error' && this.form.valid),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.formState.set({ state: '', canSend: true });
      });

    this.listenFormSubmit();
  }

  /**
   * Handles form submission pipeline.
   * This observable processes the form submission, ensures the form is valid, limits submission attempts to 10,
   * and sends the form data via an HTTP POST request. It updates the form state based on the outcome.
   */
  private listenFormSubmit() {
    this.submit$
      .pipe(
        /**
         * Maps the submission event to the form instance.
         * @returns {FormGroup} The current form group instance.
         */
        map(() => this.form),
        /**
         * Updates the internal state of the form before validation.
         * @param {FormGroup} form - The current form group instance.
         */
        tap((form) => this.updateFormState(form)),
        /**
         * Filters the form to allow only valid forms and ensures that submission attempts are less than 10.
         * @param {FormGroup} form - The current form group instance.
         * @returns {boolean} Whether the form is valid and the submission count is less than 10.
         */
        filter((form) => form.valid && this.sendTries < 10),
        /**
         * Prepares the form for submission (e.g., formatting data).
         * @param {FormGroup} form - The current form group instance.
         */
        tap((form) => this.prepareFormForSubmission(form)),
        /**
         * Sends the form data to the backend using an HTTP POST request.
         * @param {FormGroup} form - The current form group instance.
         * @returns {Observable<Object>} The HTTP POST response observable.
         */
        switchMap((form) =>
          this.http
            .post(this.endpoints.contactMessage, form.value)
            /**
             * Catches any errors during the HTTP request and handles them.
             * @param {Error} err - The error object thrown during the request.
             * @returns {Observable<Error>} The observable that handles the error.
             */
            .pipe(catchError((err) => this.handleError(err))),
        ),

        /**
         * Filters the response to ensure it was successful.
         * @param {any} res - The response from the HTTP POST request.
         * @returns {boolean} Whether the response is valid (not an error).
         */
        filter((res) => res !== 'error'),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.formState.set({
          state: 'success',
          message: CONTACT_MESSAGES.submissionSuccess,
          canSend: false,
        });
      });
  }

  /**
   * Updates the form state based on the form's validity and the number of submission attempts.
   * @param form The contact form group.
   */
  private updateFormState(form: FormGroup) {
    if (form.invalid) {
      this.formState.set({
        state: 'error',
        message: this.form.get('email')?.invalid
          ? CONTACT_MESSAGES.invalidEmail
          : CONTACT_MESSAGES.requiredFields,
        canSend: true,
      });
    } else if (this.sendTries >= 10) {
      form.disable();
      this.formState.set({
        state: 'error',
        message: CONTACT_MESSAGES.tooManyAttempts,
        canSend: false,
      });
    }
  }

  /**
   * Prepares the form for submission by disabling it and updating the form state.
   * @param form The contact form group.
   */
  private prepareFormForSubmission(form: FormGroup) {
    this.sendTries++;
    form.disable();
    this.formState.set({
      state: 'loading',
      canSend: false,
    });
  }

  /**
   * Handles errors that occur during form submission.
   * @param err The error object.
   * @returns An observable that emits 'error'.
   */
  private handleError(err: any): Observable<any> {
    this.logger.error(err).print();

    if (err.error === 'Blacklist') {
      this.formState.set({
        state: 'error',
        message: `<span>${CONTACT_MESSAGES.blacklist}</span>
          <b>
            <a
              class="danger"
              href="mailto:${CONTACT_EMAIL}?subject=Blacklist"
            >${CONTACT_EMAIL}
            </a> 
          </b>.
        `,
        canSend: false,
      });
    } else {
      this.form.enable();
      let message!: string;

      if (err.status === 400) {
        message = CONTACT_MESSAGES.error400;
      } else if (err.status === 403) {
        message = CONTACT_MESSAGES.error403;
      } else {
        message = CONTACT_MESSAGES.unknownError;
      }

      this.formState.set({
        state: 'error',
        message,
        canSend: true,
      });
    }
    return of('error');
  }
}
