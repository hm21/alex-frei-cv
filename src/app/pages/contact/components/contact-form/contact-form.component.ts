import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  isDevMode,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'af-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent extends ExtendedComponent implements OnInit {
  /** Reference to the footer container where dynamic content will be placed. */
  @ViewChild('footerRef', { static: true, read: ViewContainerRef })
  footerRef!: ViewContainerRef;

  /** Reference to the error template. */
  @ViewChild('errorRef', { static: true, read: TemplateRef })
  errorRef!: TemplateRef<any>;
  /** Reference to the success template. */
  @ViewChild('successRef', { static: true, read: TemplateRef })
  successRef!: TemplateRef<any>;
  /** Reference to the blacklist template. */
  @ViewChild('blacklistRef', { static: true, read: TemplateRef })
  blacklistRef!: TemplateRef<any>;
  /** Reference to the submit button template. */
  @ViewChild('submitBtnRef', { static: true, read: TemplateRef })
  submitBtnRef!: TemplateRef<any>;
  /** Reference to the loading spinner template. */
  @ViewChild('loadingSpinner', { static: true, read: TemplateRef })
  loadingSpinner!: TemplateRef<any>;

  /** Flag indicating whether the user is blacklisted. */
  private _blacklist = false;
  /** Flag indicating whether the form has been successfully submitted. */
  private _sended = false;
  /** Flag indicating whether the form is currently being sent. */
  private _sending = false;

  /** Number of times the form submission has been attempted. */
  private _sendTries = 0;

  /** Form group for the contact form. */
  public form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
  });

  /** HttpClient for making HTTP requests. */
  private http = inject(HttpClient);

  override ngOnInit(): void {
    this.footerRef.createEmbeddedView(this.submitBtnRef);
    super.ngOnInit();
  }

  /** Sends the contact form data. */
  public sendForm(): void {
    if (this._blacklist) return;

    if (this.form.invalid || this.form.getRawValue().email?.length === 0) {
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.errorRef, {
        msg: this.form.get('email')?.invalid
          ? $localize`Valid email address is required.`
          : $localize`<b>First Name</b>, <b>Last Name</b>, and <b>Message</b> as well as <b>E-Mail</b> are required.`,
      });
      this.footerRef.createEmbeddedView(this.submitBtnRef);
    } else if (!this._sending && !this._sended && this._sendTries < 10) {
      this._sending = true;
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.loadingSpinner);

      this._sendTries++;
      this.form.disable();

      this.http
        .post(environment.endpoints.contactMessage, this.form.value)
        .pipe(this.destroyPipe())
        .subscribe({
          next: () => {
            this._sending = false;
            this._sended = true;
            this.footerRef.clear();
            this.footerRef.createEmbeddedView(this.successRef, {
              msg: $localize`The request has been successfully submitted.`,
            });
          },
          error: (err) => {
            if (isDevMode()) console.error(err);
            this._sending = false;
            if (err.error === 'Blacklist') {
              this._blacklist = true;
              this.footerRef.clear();
              this.footerRef.createEmbeddedView(this.blacklistRef);
            } else {
              let msg = $localize`Unknown error! Please try again.`;
              switch (err.status) {
                case 403:
                  msg = $localize`Forbidden request to the server.`;
                  break;
                case 400:
                  msg = $localize`Invalid data sent. Please fill out the form correctly and try again.`;
                  break;
              }
              this.footerRef.clear();
              this.footerRef.createEmbeddedView(this.errorRef, {
                msg,
              });
              this.footerRef.createEmbeddedView(this.submitBtnRef);
              this.form.enable();
            }
          },
        });
    } else if (this._sendTries >= 10) {
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.errorRef, {
        msg: $localize`Too many requests! Please try again later.`,
      });
    }
  }
}
