import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-language-switch',
  standalone: true,
  imports: [NgClass],
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
  /**
   * Indicates whether the language dropdown is shown.
   */
  public showLanguage = signal(false);

  /**
   * The active language.
   */
  public activeLanguage!: Language;

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
   * Indicates whether dark mode is enabled.
   */
  public isDarkMode = false;

  /**
   * Document reference for accessing DOM.
   */
  private document = inject(DOCUMENT);

  override ngOnInit(): void {
    this.activeLanguage =
      this.languages.find((el) => el.iso2 === this.languageId) ??
      this.languages[0];

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

    let url = window.location.href;
    if (!url.endsWith('/')) url += '/';
    url = window.location.href.replace(
      `/${this.activeLanguage.iso2}/`,
      `/${language.iso2}/`,
    );
    window.location.href = url;
  }
}

interface Language {
  iso2: string;
  short: string;
  name: string;
}
