import {
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  booleanAttribute,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, fromEvent, switchMap, take, tap } from 'rxjs';
import {
  AnimationElementI,
  CardEffectManagerService,
} from '../services/card-effect-manager.service';
import { generateUniqueId } from '../utils/generate_unique_id';
import { IS_BROWSER } from '../utils/global-tokens';

@Directive({
  selector: '[afCardEffects]',
  standalone: true,
})
export class CardEffectsDirective implements OnInit {
  /** Optional card reference if the effect is inside of the card */
  @Input() card?: HTMLElement;
  @Input({ transform: booleanAttribute }) enableHoverAnimations = true;

  private manager = inject(CardEffectManagerService);
  private renderer = inject(Renderer2);
  private elRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private isBrowser = inject(IS_BROWSER);

  private animationElement!: AnimationElementI;

  ngOnInit() {
    if (this.isBrowser) {
      this.setAnimationElement();
      this.initHoverAnimation();
      this.manager.addElement(this.animationElement);
    }
  }

  ngOnDestroy(): void {
    this.manager.activeAnimation$.next(false);
    this.manager.removeElement(this.animationElement);
  }

  private setAnimationElement() {
    this.animationElement = {
      callback: (addClass) => {
        if (addClass) {
          this.renderer.addClass(this.elRef.nativeElement, 'light-effect');
          this.renderer.addClass(this.elRef.nativeElement, 'slow');
        } else {
          this.renderer.removeClass(this.elRef.nativeElement, 'light-effect');
          this.renderer.removeClass(this.elRef.nativeElement, 'slow');
        }
      },
      element: this.elementRef,
      id: generateUniqueId(),
    };
  }

  private initHoverAnimation() {
    if (!this.enableHoverAnimations) return;
    fromEvent(this.elementRef, 'mouseenter')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() =>
          this.manager.activeAnimation$.pipe(
            take(1),
            filter((isActive) => !isActive),
          ),
        ),
        tap(() => {
          this.manager.activeAnimation$.next(true);
          this.renderer.addClass(this.elRef.nativeElement, 'light-effect');
        }),
        delay(this.manager.delayBetweenAnimations),
        tap(() => {
          this.manager.activeAnimation$.next(false);
          this.renderer.removeClass(this.elRef.nativeElement, 'light-effect');
        }),
      )
      .subscribe();
  }

  private get elementRef() {
    return this.card ?? this.elRef.nativeElement;
  }
}