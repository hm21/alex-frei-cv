import {
  contentChild,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { IS_BROWSER } from '../providers/platform.provider';

@Directive({
  selector: '[afRoutePageAnimation]',
})
export class RoutePageAnimationDirective implements OnInit {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private contexts = inject(ChildrenOutletContexts);
  private isBrowser = inject(IS_BROWSER);

  private outlet = contentChild.required(RouterOutlet);

  private _lastAnimation?: string;

  ngOnInit() {
    if (!this.isBrowser) return;

    this.outlet().activateEvents.subscribe((cmp) => {
      this.handleRouteChange(cmp.elRef.nativeElement);
    });
  }

  private handleRouteChange(target: HTMLElement) {
    const animationName =
      this.contexts.getContext('primary')?.route?.snapshot?.data.animation;

    if (this._lastAnimation == animationName || !this._lastAnimation) {
      this._lastAnimation = animationName;
      return;
    }
    this._lastAnimation = animationName;

    const children = this.elRef.nativeElement.children;
    if (children.length < 2) return;

    switch (animationName) {
      case 'QuantumQuizPage':
      case 'ColorClashPage':
        target.style.animation = 'page-animation-game 300ms ease forwards';
        break;

      default:
        target.style.animation = 'page-animation-default 250ms ease forwards';
        break;
    }
  }
}
