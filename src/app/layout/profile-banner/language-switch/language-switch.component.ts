import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-language-switch',
  standalone: true,
  imports: [NgClass],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
            })
          ),
        ],
        { params: { duration: '200ms' } }
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
            })
          ),
        ],
        { params: { duration: '250ms' } }
      ),
    ]),
  ],
})
export class LanguageSwitchComponent extends ExtendedComponent {
  public showLanguage = false;
  public activeLanguage!: Language;

  public languages: Language[] = [
    {
      iso2: 'de',
      iso3: 'Deu',
      name: 'Deutsch',
    },
    {
      iso2: 'en',
      iso3: 'Eng',
      name: 'English',
    },
  ];

  isDarkMode = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  override ngOnInit(): void {
    // TODO: init from website config
    this.activeLanguage = this.languages[0];

    this.listenDropdownClose();
    super.ngOnInit();
  }

  private listenDropdownClose() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.document, 'click')
        .pipe(
          this.destroyPipe(),
          filter(() => this.showLanguage)
        )
        .subscribe(() => {
          this.showLanguage = false;
          this.cdRef.detectChanges();
        });
    });
  }

  public changeLanguage(language: Language) {
    this.activeLanguage = language;
    this.showLanguage = false;
    // TODO: navigate to other language
  }
}

interface Language {
  iso2: string;
  iso3: string;
  name: string;
}
