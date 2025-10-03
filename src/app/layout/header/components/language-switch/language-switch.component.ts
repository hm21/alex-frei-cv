import {
  AnimationCallbackEvent,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { filter, fromEvent, timer } from 'rxjs';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import svgGlobalizationIcon from 'src/assets/img/icon/globalization.svg';

@Component({
  selector: 'af-language-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafePipe],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
})
export class LanguageSwitchComponent
  extends ExtendedComponent
  implements OnInit
{
  protected readonly globalizationIcon = svgGlobalizationIcon;

  /**
   * Indicates whether the language dropdown is shown.
   */
  public showLanguage = signal(false);

  /**
   * The default language ID.
   */
  private readonly languageId = $localize`en`;

  /**
   * Array of supported languages.
   */
  public languages: ReadonlyArray<Language> = [
    {
      iso2: 'en',
      short: 'EN',
      name: 'English',
    },
    {
      iso2: 'de',
      short: 'DE',
      name: 'Deutsch',
    },
    {
      iso2: 'vi',
      short: 'VI',
      name: 'Vietnamese',
    },
  ];
  /**
   * The active language.
   */
  public activeLanguage = signal<Language>(this.languages[0]);

  /**
   * Indicates whether dark mode is enabled.
   */
  public isDarkMode = false;

  override ngOnInit(): void {
    this.activeLanguage.set(
      this.languages.find((el) => el.iso2 === this.languageId) ??
        this.languages[0],
    );

    this.listenDropdownClose();
    super.ngOnInit();
  }

  /**
   * Listens for click events outside the language dropdown to close it.
   * @private
   */
  private listenDropdownClose() {
    fromEvent(this.document, 'click')
      .pipe(
        this.destroyPipe(),
        filter(() => this.showLanguage()),
      )
      .subscribe(() => {
        this.showLanguage.set(false);
      });
  }

  /**
   * Changes the language.
   * @param {Language} language The language to change to.
   */
  public changeLanguage(language: Language) {
    this.showLanguage.set(false);

    let url = this.window.location.href;
    if (!url.endsWith('/')) url += '/';
    url = this.window.location.href.replace(
      `/${this.activeLanguage().iso2}/`,
      `/${language.iso2}/`,
    );
    this.window.location.href = url;
  }

  public handleAnimation(event: AnimationCallbackEvent, enter: boolean) {
    const elRef = event.target as HTMLElement;

    if (!elRef) return;

    timer(1)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        elRef.style.maxHeight = `${elRef.offsetHeight}px`;

        const classList = elRef!.classList;

        classList.remove(!enter ? 'enter' : 'leave');
        classList.add(enter ? 'enter' : 'leave');
      });
  }
}

interface Language {
  iso2: string;
  short: string;
  name: string;
}
