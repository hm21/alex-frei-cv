import {
  DestroyRef,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, fromEvent, switchMap, take, tap } from 'rxjs';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import {
  AnimationElementI,
  CardEffectManagerService,
} from 'src/app/core/services/card-effect-manager/card-effect-manager.service';
import { IdManagerService } from 'src/app/core/services/id-manager/id-manager.service';

@Directive({
  selector: '[afCardEffects]',
  standalone: true,
})
export class CardEffectsDirective implements OnInit, OnDestroy {
  /** Optional card reference if the effect is inside of the card */
  public card = input<HTMLElement | undefined>();
  public enableHoverAnimations = input(true, { transform: booleanAttribute });

  private manager = inject(CardEffectManagerService);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);
  private isBrowser = inject(IS_BROWSER);
  private idManager = inject(IdManagerService);

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
          this.elRef.nativeElement.classList.add('light-effect', 'slow');
        } else {
          this.elRef.nativeElement.classList.remove('light-effect', 'slow');
        }
      },
      element: this.elementRef,
      id: this.idManager.generateUniqueId(),
    };
  }

  private initHoverAnimation() {
    if (!this.enableHoverAnimations()) return;
    fromEvent(this.elementRef, 'mouseenter')
      .pipe(
        switchMap(() =>
          this.manager.activeAnimation$.pipe(
            take(1),
            filter((isActive) => !isActive),
          ),
        ),
        // Trigger animation
        tap(() => {
          this.manager.activeAnimation$.next(true);
          this.elRef.nativeElement.classList.add('light-effect');
        }),
        // Delay until the animation will end
        delay(this.manager.delayBetweenAnimations),
        // Remove animation effect
        tap(() => {
          this.manager.activeAnimation$.next(false);
          this.elRef.nativeElement.classList.remove('light-effect');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private get elementRef() {
    return this.card() ?? this.elRef.nativeElement;
  }
}
