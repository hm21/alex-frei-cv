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
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent extends ExtendedComponent implements OnInit {
  @ViewChild('footerRef', { static: true, read: ViewContainerRef })
  footerRef!: ViewContainerRef;

  @ViewChild('errorRef', { static: true, read: TemplateRef })
  errorRef!: TemplateRef<any>;
  @ViewChild('successRef', { static: true, read: TemplateRef })
  successRef!: TemplateRef<any>;
  @ViewChild('blacklistRef', { static: true, read: TemplateRef })
  blacklistRef!: TemplateRef<any>;
  @ViewChild('submitBtnRef', { static: true, read: TemplateRef })
  submitBtnRef!: TemplateRef<any>;
  @ViewChild('loadingSpinner', { static: true, read: TemplateRef })
  loadingSpinner!: TemplateRef<any>;

  private _blacklist = false;
  private _sended = false;
  private _sending = false;

  private _sendTries = 0;

  public form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
  });

  private http = inject(HttpClient);

  override ngOnInit(): void {
    this.footerRef.createEmbeddedView(this.submitBtnRef);
    super.ngOnInit();
  }

  public sendForm(): void {
    if (this._blacklist) return;

    if (this.form.invalid || this.form.getRawValue().email?.length === 0) {
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.errorRef, {
        msg: this.form.get('email')?.invalid
          ? 'Valid email address is required.'
          : `<b>First Name</b>, <b>Last Name</b>, and <b>Message</b> as well as <b>E-Mail</b> are required.`,
      });
      this.footerRef.createEmbeddedView(this.submitBtnRef);
      this.cdRef.detectChanges();
    } else if (!this._sending && !this._sended && this._sendTries < 10) {
      this._sending = true;
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.loadingSpinner);

      this._sendTries++;
      this.form.disable();
      this.cdRef.detectChanges();

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
            this.cdRef.detectChanges();
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
            this.cdRef.detectChanges();
          },
        });
    } else if (this._sendTries >= 10) {
      this.footerRef.clear();
      this.footerRef.createEmbeddedView(this.errorRef, {
        msg: $localize`Too many submission attempts! Please try again later.`,
      });

      this.cdRef.detectChanges();
    }
  }
}
