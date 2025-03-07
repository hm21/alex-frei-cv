import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
} from 'rxjs';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SKILL_CARDS } from 'src/app/shared/constants/skill-cards.constants';
import { SkillCard } from './interface/skill-card.interface';

@Component({
  selector: 'af-about-me-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './about-me-skills.component.html',
  styleUrl: './about-me-skills.component.scss',
})
export class AboutMeSkillsComponent
  extends ExtendedComponent
  implements OnInit
{
  private containerRef = viewChild.required('containerRef', {
    read: ViewContainerRef,
  });
  private bubbleTemplate = viewChild.required('bubbleTemplate', {
    read: TemplateRef<any>,
  });
  private listRef = viewChild.required<ElementRef<HTMLUListElement>>('listRef');

  /**
   * Duration of the animation in milliseconds.
   */
  public readonly animationDuration = 20_000;

  /**
   * List of skills to be displayed and animated.
   */
  private readonly skillList = SKILL_CARDS;

  override ngOnInit(): void {
    super.ngOnInit();
    this.generateItems();
    this.initAnimation();
  }

  /**
   * Generates the initial skill items to be displayed.
   */
  private generateItems() {
    // Generate the items twice so that the user can't see the end.
    for (let i = 0; i < 2; i++) {
      this.skillList.forEach((skill) => {
        this.addItem(skill);
      });
    }
  }
  /**
   * Adds a skill item to the view container.
   */
  private addItem(skill: SkillCard) {
    this.containerRef().createEmbeddedView(this.bubbleTemplate(), { skill });
  }

  /**
   * Initializes the animation sequence for the skill items.
   */
  private initAnimation() {
    if (!this.isBrowser) return;

    const elRef = this.listRef().nativeElement;
    // Generate the items twice so that the user can't see the end.
    elRef.style.width = `${this.skillList.length * 2 * 120}px`;
    // Set the animation duration
    elRef.style.animationDuration = `${this.animationDuration}ms`;

    // Ensure item is in the viewport
    const scroll$ = this.screen.scroll$.pipe(
      startWith(this.isElementVisible()),
      map(() => this.isElementVisible()),
      distinctUntilChanged(),
    );
    // Ensure the browser tab is visible
    const visibilityChange$ = fromEvent(this.document, 'visibilitychange').pipe(
      startWith(this.document.visibilityState),
      map(() => this.document.visibilityState === 'visible'),
      distinctUntilChanged(),
    );

    combineLatest([scroll$, visibilityChange$])
      .pipe(
        this.destroyPipe(),
        map(([isElementVisible, isVisible]) => isElementVisible && isVisible),
      )
      .subscribe((show) => {
        elRef.style.animationPlayState = show ? 'running' : 'paused';
      });
  }

  /**
   * Checks if the element is visible in the viewport.
   * @returns {boolean} true if the element is visible, false otherwise.
   * @private
   */
  private isElementVisible(): boolean {
    const el = this.elRef.nativeElement;
    const bounding = el.getBoundingClientRect();
    const y = bounding.top - this.screen.height;
    return y < 0 && bounding.top > -bounding.height;
  }
}
