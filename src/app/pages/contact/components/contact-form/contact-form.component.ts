import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, catchError, retry, throwError } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'af-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent extends ExtendedComponent {
  public pageTitle = '';
  public serverError = '';
  private mode: 'support' | 'contact' | '' = '';

  public showError = false;
  private _blacklist = false;
  private _sended = false;
  private _sending = false;

  private _sendTries = 0;

  private destroy = new Subject();

  public form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
    // phone: new FormControl('',),
  });
  constructor(private http: HttpClient) {
    super();
  }

  override ngOnInit(): void {
    this.init();
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private init() {
    this.form.reset();
    this._sended = false;
    this._sending = false;
    this._sendTries = 0;

    this.pageTitle =
      this.mode === 'contact' ? $localize`Kontakt` : $localize`Support`;
  }

  public sendForm(): void {
    if (this._blacklist) {
      return;
    }
    if (this.form.invalid || this.form.get('email')?.value?.length === 0) {
      //&& this.form.get('phone')?.value?.length === 0
      this.showError = true;
      this.cdRef.detectChanges();
    } else if (!this._sending && !this._sended && this._sendTries < 10) {
      this.showError = false;
      this._sending = true;
      this.form.disable();
      this._sendTries++;
      this.cdRef.detectChanges();

      this.http
        .post(
          environment.endpoints.contactMessage,
          Object.assign(this.form.value, { mode: this.mode })
        )
        .pipe(
          retry(1),
          catchError((err) => {
            console.error(err);
            this._sending = false;
            if (err.error === 'Blacklist') {
              this._blacklist = true;
              return throwError(() => 'DDOS ATTACK!');
            }
            switch (err.status) {
              case 403:
                this.serverError = $localize`Verbotene Anfrage an den Server.`;
                break;
              case 422:
                this.serverError = $localize`Ungültige Daten gesendet. Füllen Sie das Formular korrekt aus und versuchen Sie es erneut.`;
                break;
              case 500:
                this.serverError = $localize`Fehler beim Übermitteln der Nachricht. Versuchen Sie es später erneut.`;
                break;
              default:
                this.serverError = $localize`Unbekannter Fehler! Bitte versuchen Sie es erneut.`;
                break;
            }
            this.form.enable();
            this.cdRef.detectChanges();
            return throwError(() => err.error);
          })
        )
        .subscribe(() => {
          this._sending = false;
          this._sended = true;
          this.cdRef.detectChanges();
        });
    } else if (this._sendTries >= 10) {
      this.serverError = $localize`Zuviele Übermittlungsversuche! Versuchen Sie es später erneut.`;
      this.cdRef.detectChanges();
    }
  }

  public get sending() {
    return this._sending;
  }
  public get sended() {
    return this._sended;
  }
  public get blacklist() {
    return this._blacklist;
  }
}
