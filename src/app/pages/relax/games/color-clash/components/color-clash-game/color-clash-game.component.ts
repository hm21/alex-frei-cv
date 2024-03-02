import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT, NgStyle, UpperCasePipe } from '@angular/common';
import {
  Component,
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
  takeUntil,
  timer,
} from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import {
  ColorClashGameButton,
  ColorClashGameItem,
  ColorClashGameState,
  ColorClashRandomItem,
} from '../../utils/color-clash-interface';

@Component({
  selector: 'af-color-clash-game',
  standalone: true,
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
  @Output() updateGameState = new EventEmitter<ColorClashGameState>();
  public GameState = ColorClashGameState;

  @ViewChild('buttonsRef', { static: true, read: ViewContainerRef })
  buttonsRef!: ViewContainerRef;

  @ViewChild('itemRef', { static: true, read: TemplateRef })
  itemRef!: TemplateRef<any>;
  @ViewChild('buttonRef', { static: true, read: TemplateRef })
  buttonRef!: TemplateRef<ColorClashGameButton>;

  public viewItems = signal<ColorClashGameItem[]>([]);
  private gameButtons: ColorClashGameButton[] = [];

  private countdownDuration: number = 120;
  private activeCountdown = false;
  public time = signal('02:00');
  public warmUpRounds = signal(0);
  private points = 0;
  private wrong = 0;
  private itemCount = 0;

  private readonly shortcutKeys = ['s', 'd', 'f', 'j', 'k', 'l'];

  private readonly colors = [
    // forest-green
    '#009688',
    // red
    '#E91E63',
    // blue
    '#2196f3',
    // violet
    '#673ab7',
    // dark orange
    '#c77600',
    // black
    '#000000',
  ];

  private countdownDestroy$ = new Subject();

  private sanitizer = inject(DomSanitizer);
  private document = inject(DOCUMENT);

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.generateButtons();
      this.generateItems();
      this.listenShortcutKeys();
    }

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.buttonsRef.clear();
    this.countdownDestroy$.next(true);
    this.countdownDestroy$.complete();
  }

  private generateButtons() {
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
    function getRandomNumbers(): ColorClashRandomItem[] {
      const items: ColorClashRandomItem[] = [];

      while (items.length < 4) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;

        if (items.findIndex((el) => el.id === randomNumber.toString()) < 0) {
          items.push({
            id: randomNumber.toString(),
            content: randomNumber,
          });
        }
      }

      return items;
    }
    function getRandomSymbol(): ColorClashRandomItem[] {
      const symbolsSVG = [rectangleSVG, triangleSVG, circleSVG];

      const symbols: ColorClashRandomItem[] = [];

      while (symbols.length < 2) {
        const randomSymbol =
          symbolsSVG[Math.floor(Math.random() * symbolsSVG.length)];

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
      items = insertAtPosition(
        items,
        el,
        Math.floor(Math.random() * (items.length + 1)),
      );
    });

    this.gameButtons = [];
    const colors = [...this.colors];
    items.forEach((item, i) => {
      const btn = {
        id: item.id,
        content: this.sanitizer.bypassSecurityTrustHtml(item.content),
        color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
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
  private generateItems() {
    while (this.viewItems().length < 3) {
      const id =
        this.gameButtons[Math.floor(Math.random() * this.gameButtons.length)]
          .id;
      const meaning = this.getMeaning(id);
      this.viewItems().unshift({
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        content: this.sanitizer.bypassSecurityTrustHtml(meaning),
        item: meaning,
        mode: Math.random() > 0.5 ? 'color' : 'meaning',
        loopId: ++this.itemCount,
        id,
      });
    }
  }

  public buttonTap(id: string | number, color: string) {
    const lastItem = this.viewItems()[this.viewItems().length - 1];

    if (this.warmUpRounds() < 3) {
      this.warmUpRounds.update((count) => ++count);
    }

    lastItem.isCorrect =
      lastItem.mode === 'color'
        ? lastItem.color === color
        : lastItem!.id === id;

    if (this.warmUpRounds() >= 3) {
      lastItem.isCorrect ? this.points++ : this.wrong++;
    }

    timer(1)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.viewItems().pop();
        if (!this.activeCountdown) this.startCountdown();
        this.generateItems();
      });
  }

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

  private listenShortcutKeys() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => this.shortcutKeys.includes(event.key)),
        this.destroyPipe(),
      )
      .subscribe((event) => {
        const i =
          event.key === 's'
            ? 0
            : event.key === 'd'
              ? 1
              : event.key === 'f'
                ? 2
                : event.key === 'j'
                  ? 3
                  : event.key === 'k'
                    ? 4
                    : 5;

        const btn = this.gameButtons[i];
        this.buttonTap(btn.id, btn.color);
      });
  }
  private startCountdown() {
    function secondsToMMSS(seconds: number): string {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
      const minutesStr: string = minutes < 10 ? '0' + minutes : '' + minutes;
      const secondsStr: string =
        remainingSeconds < 10 ? '0' + remainingSeconds : '' + remainingSeconds;
      return `${minutesStr}:${secondsStr}`;
    }

    this.activeCountdown = true;
    this.countdownDestroy$.next(true);
    interval(1_000)
      .pipe(
        map((tick) => secondsToMMSS(this.countdownDuration - tick - 1)),
        takeUntil(this.countdownDestroy$),
        this.destroyPipe(),
      )
      .subscribe((time) => {
        this.time.set(time);
        if (time === '00:00') {
          this.activeCountdown = false;
          this.countdownDestroy$.next(true);
        }
      });
  }
}
