import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
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
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { ThemeManagerService } from 'src/app/services/theme-manager/theme-manager.service';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgInfoIcon from 'src/assets/img/icon/info.svg';
import { colorClashItemAnimation } from '../../../../../../animations/color-clash-item.animation';
import { ColorClashManagerService } from '../../utils/color-clash-manager.service';
import { ColorClashGameItem } from '../../utils/color-clash.interface';
import { ColorClashGameButton } from '../models/color-clash-button.model';
import { ColorClashRandomItems } from '../models/color-clash-random-items.model';

@Component({
  selector: 'af-color-clash-game',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipDirective,
    UpperCasePipe,
    RouterLink,
    QuicklinkDirective,
    SafePipe,
  ],
  templateUrl: './color-clash-game.component.html',
  styleUrls: [
    '../../../../styles/game-shortcut-key.scss',
    './color-clash-game.component.scss',
  ],
  animations: [colorClashItemAnimation],
})
export class ColorClashGameComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  public infoIcon = svgInfoIcon;

  /** Reference to the buttons container in the template. */
  private buttonsRef = viewChild.required('buttonsRef', {
    read: ViewContainerRef,
  });

  /** Reference to the button template in the template. */
  private buttonRef = viewChild.required('buttonRef', {
    read: TemplateRef<ColorClashGameButton>,
  });

  /** Reference to the time banner element. */
  public timeBanner = viewChild<ElementRef<HTMLElement>>('timeBanner');

  /** Array of game items to be displayed. */
  public viewItems = signal<ColorClashGameItem[]>([]);

  /** Array of game buttons. */
  private gameButtons: ColorClashGameButton[] = [];

  /** Duration of the countdown timer in seconds. */
  private countdownDuration: number = 60;

  /** Flag indicating if the countdown is active. */
  private activeCountdown = false;

  /** Signal representing the number of warm-up rounds. */
  public warmUpRounds = signal(0);

  /** Number of items generated. */
  private itemCount = 0;

  /** Array of shortcut keys for the game buttons. */
  private readonly shortcutKeys = ['s', 'd', 'f', 'j', 'k', 'l'];

  /** Array of colors used for the game buttons and items. */
  private readonly colors = [
    '#009688', // forest-green
    '#E91E63', // red
    '#2196f3', // blue
    '#673ab7', // violet
    '#c77600', // dark orange
    '#000000', // black => white in darkMode
  ];

  /** Subject used to destroy the countdown timer. */
  private countdownDestroy$ = new Subject();

  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  public theme = inject(ThemeManagerService);
  private gameManager = inject(ColorClashManagerService);

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
    this.countdownDestroy$.next(true);
    this.countdownDestroy$.complete();
  }

  /** Listens for shortcut key events. */
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

  /** Listens for theme change events. */
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

  /** Generates the game buttons. */
  private generateButtons() {
    this.gameButtons.clear();
    const colors = [...this.colors];
    new ColorClashRandomItems().generate().forEach((item, i) => {
      const btn = new ColorClashGameButton({
        id: item.id,
        content: this.sanitizer.bypassSecurityTrustHtml(
          item.content.toString(),
        ),
        color: colors.splice(Math.randomNextInt(colors.length), 1)[0],
        buttonIndex: i,
      });
      this.gameButtons.push(btn);
      this.buttonsRef().createEmbeddedView(this.buttonRef(), btn);
    });
  }

  /** Generates the game items. */
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
      if (lastItem.isCorrect) {
        this.gameManager.points.update((val) => val + 1);
      } else {
        this.gameManager.mistakes.update((val) => val + 1);
      }
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

  /** Starts the countdown timer. */
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
          this.timeBanner()!.nativeElement.innerHTML = time;
        }),
        filter((time) => time === '00:00'),
      )
      .subscribe(() => {
        this.setGameFinish();
      });
  }

  /** Sets the game finish state and updates the high score if necessary. */
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
      this.gameManager.mistakes() < highScore?.mistakes ||
      (this.gameManager.mistakes() <= highScore?.mistakes &&
        this.gameManager.points() > highScore.points)
    ) {
      localStorage.setItem(
        'color-clash-high-score',
        JSON.stringify({
          points: this.gameManager.points(),
          mistakes: this.gameManager.mistakes(),
        }),
      );
    }

    this.router.navigate([
      '/relax',
      'color-clash',
      { outlets: { state: 'evaluation' } },
    ]);
  }
}
