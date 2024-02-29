import { NgStyle } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-color-clash-game',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './color-clash-game.component.html',
  styleUrl: './color-clash-game.component.scss',
})
export class ColorClashGameComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('itemsRef', { static: true, read: ViewContainerRef })
  itemsRef!: ViewContainerRef;
  @ViewChild('buttonsRef', { static: true, read: ViewContainerRef })
  buttonsRef!: ViewContainerRef;

  @ViewChild('itemRef', { static: true, read: TemplateRef })
  itemRef!: TemplateRef<any>;
  @ViewChild('buttonRef', { static: true, read: TemplateRef })
  buttonRef!: TemplateRef<GameButton>;

  private gameButtons: GameButton[] = [];

  private sanitizer = inject(DomSanitizer);

  override ngOnInit(): void {
    if (this.isBrowser) this.generateButtons();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.buttonsRef.clear();
    this.itemsRef.clear();
  }

  private generateButtons() {
    const colors = [
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

    const rectangleSVG = `
            <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100"/>
            </svg>
            `;

    const triangleSVG = `
          <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 0,100 100,100" />
          </svg>
          `;

    const circleSVG = `
          <svg fill="red" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50"/>
          </svg>
          `;

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
    function getRandomNumbers(): number[] {
      const numbers: number[] = [];

      while (numbers.length < 4) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;

        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }

      return numbers;
    }
    function getRandomSymbol(): string[] {
      const symbolsSVG = [rectangleSVG, triangleSVG, circleSVG];

      const symbols: string[] = [];

      while (symbols.length < 2) {
        const randomSymbol =
          symbolsSVG[Math.floor(Math.random() * symbolsSVG.length)];

        if (!symbols.includes(randomSymbol)) {
          symbols.push(randomSymbol);
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
    items.forEach((el, i) => {
      const btn = {
        index: i,
        item: el,
        content: this.sanitizer.bypassSecurityTrustHtml(el),
        color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
      };
      this.gameButtons.push(btn);
      this.buttonsRef.createEmbeddedView(this.buttonRef, btn);
    });
  }

  public buttonTap(index: number) {
    console.log(index);
  }
}

interface GameButton {
  index: number;
  content: SafeHtml;
  item: string;
  color: string;
}
