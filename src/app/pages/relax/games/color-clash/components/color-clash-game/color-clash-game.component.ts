import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgStyle, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Subject,
  filter,
  fromEvent,
  interval,
  map,
  startWith,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { ThemeManagerService } from 'src/app/services/theme-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import {
  ColorClashFinishEvent,
  ColorClashGameButton,
  ColorClashGameItem,
  ColorClashGameState,
  ColorClashRandomItem,
} from '../../utils/color-clash-interface';

@Component({
  selector: 'af-color-clash-game',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, UpperCasePipe],
  templateUrl: './color-clash-game.component.html',
  styleUrls: [
    '../../../../styles/game-shortcut-key.scss',
    './color-clash-game.component.scss',
  ],
  animations: [
    trigger('viewItem', [
      transition(
        ':leave',
        [
          style({
            opacity: 1,
            transform: '*',
          }),
          animate(
            '{{duration}} ease',
            keyframes([
              style({
                offset: 0.7,
                opacity: 0.5,
                transform: 'translate(-50%, 50px)',
                background: '{{color}}',
              }),
              style({
                offset: 1,
                opacity: 0,
                transform: 'translate(-50%, 70px)',
              }),
            ]),
          ),
        ],
        { params: { duration: '500ms', color: 'red' } },
      ),
    ]),
  ],
})
export class ColorClashGameComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /**
   * Event emitted when the game finishes.
   */
  @Output() finishGame = new EventEmitter<ColorClashFinishEvent>();

  /**
   * Event emitted when the game state is updated.
   */
  @Output() updateGameState = new EventEmitter<ColorClashGameState>();

  /**
   * Enumeration of possible game states.
   */
  public GameState = ColorClashGameState;

  /**
   * Reference to the buttons container in the template.
   */
  @ViewChild('buttonsRef', { static: true, read: ViewContainerRef })
  buttonsRef!: ViewContainerRef;

  /**
   * Reference to the item template in the template.
   */
  @ViewChild('itemRef', { static: true, read: TemplateRef })
  itemRef!: TemplateRef<any>;

  /**
   * Reference to the button template in the template.
   */
  @ViewChild('buttonRef', { static: true, read: TemplateRef })
  buttonRef!: TemplateRef<ColorClashGameButton>;

  @ViewChild('timeBanner')
  timeBanner!: ElementRef<HTMLElement>;

  /**
   * Array of game items to be displayed.
   */
  public viewItems = signal<ColorClashGameItem[]>([]);

  /**
   * Array of game buttons.
   */
  private gameButtons: ColorClashGameButton[] = [];

  /**
   * Duration of the countdown timer in seconds.
   */
  private countdownDuration: number = 60;

  /**
   * Flag indicating if the countdown is active.
   */
  private activeCountdown = false;

  /**
   * Signal representing the number of warm-up rounds.
   */
  public warmUpRounds = signal(0);

  /**
   * Number of points earned by the player.
   */
  private points = 0;

  /**
   * Number of mistakes made by the player.
   */
  private mistakes = 0;

  /**
   * Number of items generated.
   */
  private itemCount = 0;

  /**
   * Array of shortcut keys for the game buttons.
   */
  private readonly shortcutKeys = ['s', 'd', 'f', 'j', 'k', 'l'];

  /**
   * Array of colors used for the game buttons and items.
   */
  private readonly colors = [
    '#009688', // forest-green
    '#E91E63', // red
    '#2196f3', // blue
    '#673ab7', // violet
    '#c77600', // dark orange
    '#000000', // black => white in darkmode
  ];

  /**
   * Subject used to destroy the countdown timer.
   */
  private countdownDestroy$ = new Subject();

  private sanitizer = inject(DomSanitizer);
  public theme = inject(ThemeManagerService);

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.generateButtons();
      this.generateItems();
      this.listenShortcutKeys();
      this.listenTheme();
    }

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.buttonsRef.clear();
    this.countdownDestroy$.next(true);
    this.countdownDestroy$.complete();
  }

  /**
   * Listens for shortcut key events.
   */
  private listenShortcutKeys() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => this.shortcutKeys.includes(event.key)),
        map((event) => {
          switch (event.key) {
            case 's':
              return 0;
            case 'd':
              return 1;
            case 'f':
              return 2;
            case 'j':
              return 3;
            case 'k':
              return 4;
            default:
              return 5;
          }
        }),
        this.destroyPipe(),
      )
      .subscribe((buttonId) => {
        const btn = this.gameButtons[buttonId];
        this.buttonTap(btn.id, btn.color);
      });
  }
  /**
   * Listens for theme change events.
   */
  private listenTheme() {
    this.theme.changed$
      .pipe(this.destroyPipe(), startWith(this.theme.isDarkMode()))
      .subscribe((isDarkMode) => {
        const oldColor = !isDarkMode ? '#ffffff' : '#000000';
        const newColor = isDarkMode ? '#ffffff' : '#000000';

        this.colors.updateLastItem(newColor);
        this.gameButtons
          .filter((el) => el.color == oldColor)
          .forEach((button) => {
            button.color = newColor;
          });
        this.viewItems.update((items) => {
          items
            .filter((e) => e.color === oldColor)
            .forEach((item) => {
              item.color = newColor;
            });
          return [...items];
        });
      });
  }

  /**
   * Generates the game buttons.
   */
  private generateButtons() {
    // SVG definitions for different shapes
    const rectangleSVG = {
      id: 'rect',
      svg: `
      <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="100" height="100"/>
      </svg>
      `,
    };
    const triangleSVG = {
      id: 'triangle',
      svg: `
          <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 0,100 100,100" />
          </svg>
          `,
    };
    const circleSVG = {
      id: 'circle',
      svg: `
          <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50"/>
          </svg>
          `,
    };

    /**
     * Inserts an element at a specific position in an array.
     * @param array - The array to insert the element into.
     * @param element - The element to insert.
     * @param position - The position to insert the element at.
     * @returns The new array with the element inserted.
     * @throws Error if the position is invalid.
     */
    function insertAtPosition<T>(
      array: T[],
      element: T,
      position: number,
    ): T[] {
      if (position < 0 || position > array.length) {
        throw new Error('Invalid position');
      }

      const newArray = [
        ...array.slice(0, position),
        element,
        ...array.slice(position),
      ];
      return newArray;
    }

    /**
     * Generates an array of random numbers.
     * @returns An array of random numbers.
     */
    function getRandomNumbers(): ColorClashRandomItem[] {
      const items: ColorClashRandomItem[] = [];

      while (items.length < 4) {
        const randomNumber = Math.randomNextInt(10, 1);

        if (items.findIndex((el) => el.id === randomNumber.toString()) < 0) {
          items.push({
            id: randomNumber.toString(),
            content: randomNumber,
          });
        }
      }

      return items;
    }

    /**
     * Generates an array of random symbols.
     * @returns An array of random symbols.
     */
    function getRandomSymbol(): ColorClashRandomItem[] {
      const symbolsSVG = [rectangleSVG, triangleSVG, circleSVG];

      const symbols: ColorClashRandomItem[] = [];

      while (symbols.length < 2) {
        const randomSymbol = symbolsSVG[Math.randomNextInt(symbolsSVG.length)];

        if (symbols.findIndex((el) => el.id === randomSymbol.id) < 0) {
          symbols.push({
            id: randomSymbol.id,
            content: randomSymbol.svg,
          });
        }
      }

      return symbols;
    }

    let items: Array<any> = getRandomNumbers();

    getRandomSymbol().forEach((el) => {
      items = insertAtPosition(items, el, Math.randomNextInt(items.length + 1));
    });

    this.gameButtons.clear();
    const colors = [...this.colors];
    items.forEach((item, i) => {
      const btn = {
        id: item.id,
        content: this.sanitizer.bypassSecurityTrustHtml(item.content),
        color: colors.splice(Math.randomNextInt(colors.length), 1)[0],
        shortcut:
          i === 0
            ? 'S'
            : i === 1
              ? 'D'
              : i === 2
                ? 'F'
                : i === 3
                  ? 'J'
                  : i === 4
                    ? 'K'
                    : 'L',
      };
      this.gameButtons.push(btn);
      this.buttonsRef.createEmbeddedView(this.buttonRef, btn);
    });
  }

  /**
   * Generates the game items.
   */
  private generateItems() {
    while (this.viewItems().length < 3) {
      const id =
        this.gameButtons[Math.randomNextInt(this.gameButtons.length)].id;
      const meaning = this.getMeaning(id);
      const mode = Math.random() > 0.5 ? 'color' : 'meaning';
      this.viewItems.update((items) => {
        const newItem: ColorClashGameItem = {
          color: this.colors[Math.randomNextInt(this.colors.length)],
          content: this.sanitizer.bypassSecurityTrustHtml(meaning),
          item: meaning,
          mode,
          modeTranslated:
            mode === 'color' ? $localize`Color` : $localize`Meaning`,
          loopId: ++this.itemCount,
          id,
        };
        return [newItem, ...items];
      });
    }
  }

  /**
   * Handles the button tap event.
   * @param id - The ID of the button.
   * @param color - The color of the button.
   */
  public buttonTap(id: string | number, color: string) {
    const lastItem = this.viewItems().getLastItem()!;
    if (this.warmUpRounds() < 3) {
      this.warmUpRounds.update((count) => ++count);
    }

    lastItem.isCorrect =
      lastItem.mode === 'color'
        ? lastItem.color === color
        : lastItem!.id === id;

    if (this.activeCountdown) {
      lastItem.isCorrect ? this.points++ : this.mistakes++;
    }

    timer(1)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        if (this.warmUpRounds() >= 3 && !this.activeCountdown) {
          this.startCountdown();
        }
        this.viewItems.update((items) => {
          items.pop();
          return items;
        });
        this.generateItems();
      });
  }

  /**
   * Gets the meaning of an item based on its ID.
   * @param id - The ID of the item.
   * @returns The meaning of the item.
   * @throws Error if the meaning for the ID is not found.
   */
  private getMeaning(id: string) {
    switch (id) {
      case '1':
        return $localize`One`;
      case '2':
        return $localize`Two`;
      case '3':
        return $localize`Three`;
      case '4':
        return $localize`Four`;
      case '5':
        return $localize`Five`;
      case '6':
        return $localize`Six`;
      case '7':
        return $localize`Seven`;
      case '8':
        return $localize`Eight`;
      case '9':
        return $localize`Nine`;
      case 'rect':
        return $localize`Rectangle`;
      case 'circle':
        return $localize`Circle`;
      case 'triangle':
        return $localize`Triangle`;
      default:
        throw new Error(`Meaning for id ${id} is required!`);
    }
  }

  /**
   * Starts the countdown timer.
   */
  private startCountdown() {
    /**
     * Converts seconds to the format 'MM:SS'.
     * @param seconds - The number of seconds.
     * @returns The formatted time string.
     */
    function secondsToMMSS(seconds: number): string {
      const minutes: number = (seconds / 60).floor();
      const remainingSeconds: number = seconds % 60;
      return `${minutes.padStart(2, '0')}:${remainingSeconds.padStart(2, '0')}`;
    }

    this.activeCountdown = true;
    this.countdownDestroy$.next(true);
    interval(1_000)
      .pipe(
        map((tick) => secondsToMMSS(this.countdownDuration - tick - 1)),
        takeUntil(this.countdownDestroy$),
        this.destroyPipe(),
        tap((time) => {
          this.timeBanner.nativeElement.innerHTML = time;
        }),
        filter((time) => time === '00:00'),
      )
      .subscribe(() => {
        this.setGameFinish();
      });
  }

  /**
   * Sets the game finish state and updates the high score if necessary.
   */
  private setGameFinish() {
    this.activeCountdown = false;
    this.countdownDestroy$.next(true);

    const highScore = JSON.parse(
      localStorage.getItem('color-clash-high-score') ??
        JSON.stringify({
          points: 0,
          mistakes: 0,
        }),
    );

    if (
      !highScore.points ||
      this.mistakes < highScore?.mistakes ||
      (this.mistakes <= highScore?.mistakes && this.points > highScore.points)
    ) {
      localStorage.setItem(
        'color-clash-high-score',
        JSON.stringify({
          points: this.points,
          mistakes: this.mistakes,
        }),
      );
    }
    this.finishGame.emit({
      points: this.points,
      mistakes: this.mistakes,
    });
  }
}
