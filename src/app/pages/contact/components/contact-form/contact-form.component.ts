import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Observable,
  Subject,
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap
} from 'rxjs';
import {
  CONTACT_EMAIL,
  CONTACT_MESSAGES,
} from 'src/app/configs/contact-options';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
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
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  /** Subject that triggers the form submission. */
  public submit$ = new Subject<void>();

  /** Observable that tracks the form state and related messages. */
  public formState = signal<{
    state: 'success' | 'error' | 'loading' | '';
    msg?: string;
    canSend: boolean;
  }>({
    state: '',
    canSend: true,
  });

  /** Number of times the form submission has been attempted. */
  private sendTries = 0;

  private http = inject(HttpClient);
  private endpoints = inject(ENDPOINTS);
  private logger = inject(LoggerService);

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

    this.submit$
      .pipe(
        map(() => this.form),
        tap((form) => this.updateFormState(form)),
        /// Ensure the form is valid and verify that the user has not submitted it more than 10 times.
        filter((form) => form.valid && this.sendTries < 10),
        tap((form) => this.prepareFormForSubmission(form)),
        switchMap((form) =>
          this.http
            .post(this.endpoints.contactMessage, form.value)
            .pipe(catchError((err) => this.handleError(err))),
        ),
        filter((res) => res !== 'error'),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.formState.set({
          state: 'success',
          msg: CONTACT_MESSAGES.submissionSuccess,
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
        msg: this.form.get('email')?.invalid
          ? CONTACT_MESSAGES.invalidEmail
          : CONTACT_MESSAGES.requiredFields,
        canSend: true,
      });
    } else if (this.sendTries >= 10) {
      form.disable();
      this.formState.set({
        state: 'error',
        msg: CONTACT_MESSAGES.tooManyAttempts,
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
        msg: `<span>${CONTACT_MESSAGES.blacklist}</span>
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
      let msg!: string;

      if (err.status === 400) {
        msg = CONTACT_MESSAGES.error400;
      } else if (err.status === 403) {
        msg = CONTACT_MESSAGES.error403;
      } else {
        msg = CONTACT_MESSAGES.unknownError;
      }

      this.formState.set({
        state: 'error',
        msg,
        canSend: true,
      });
    }
    return of('error');
  }
}
