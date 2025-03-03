import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
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
  animations: [
    trigger('dropdown', [
      transition(
        ':enter',
        [
          style({
            opacity: 0,
            height: 0,
            'box-shadow': 'unset',
          }),
          animate(
            '{{duration}} ease',
            style({
              opacity: 1,
              height: '*',
              'box-shadow': '*',
            }),
          ),
        ],
        { params: { duration: '200ms' } },
      ),
      transition(
        ':leave',
        [
          style({
            opacity: 1,
            pointerEvents: 'none',
            height: '*',
            'box-shadow': '*',
          }),
          animate(
            '{{duration}} ease',
            style({
              opacity: 0,
              height: 0,
              'box-shadow': 'unset',
            }),
          ),
        ],
        { params: { duration: '250ms' } },
      ),
    ]),
  ],
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
  public languages: Language[] = [
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
}

interface Language {
  iso2: string;
  short: string;
  name: string;
}
