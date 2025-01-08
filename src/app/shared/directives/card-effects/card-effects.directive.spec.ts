import { Component, ElementRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { CardEffectManagerService } from 'src/app/core/services/card-effect-manager/card-effect-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { CardEffectsDirective } from './card-effects.directive';

@Component({
  template: ` <div
    afCardEffects
    [enableHoverAnimations]="enableHoverAnimations()"
  ></div>`,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
class TestComponent {
  public enableHoverAnimations = signal(false);
}

describe('CardEffectsDirective', () => {
  let directive: CardEffectsDirective;
  let cardEffectManagerService: CardEffectManagerService;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    const divElement = document.createElement('div');
    const elRefMock = new ElementRef(divElement);

    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [CardEffectsDirective, SharedTestingModule],
      declarations: [TestComponent],
      providers: [
        { provide: ElementRef, useValue: elRefMock },
        { provide: IS_BROWSER, useValue: true },
        CardEffectManagerService,
      ],
    });

    cardEffectManagerService = TestBed.inject(CardEffectManagerService);

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    const directiveEl = fixture.debugElement.query(
      By.directive(CardEffectsDirective),
    );
    directive = directiveEl.injector.get(CardEffectsDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set animation element on init', () => {
    spyOn(directive as any, 'setAnimationElement').and.callThrough();
    spyOn(directive as any, 'initHoverAnimation').and.callThrough();
    spyOn(cardEffectManagerService, 'addElement');

    directive.ngOnInit();

    expect((directive as any).setAnimationElement).toHaveBeenCalled();
    expect((directive as any).initHoverAnimation).toHaveBeenCalled();
    expect(cardEffectManagerService.addElement).toHaveBeenCalledWith(
      (directive as any).animationElement,
    );
  });

  it('should remove animation element on destroy', () => {
    spyOn(cardEffectManagerService, 'removeElement');
    spyOn(cardEffectManagerService.activeAnimation$, 'next');

    directive.ngOnDestroy();

    expect(cardEffectManagerService.activeAnimation$.next).toHaveBeenCalledWith(
      false,
    );
    expect(cardEffectManagerService.removeElement).toHaveBeenCalledWith(
      (directive as any).animationElement,
    );
  });

  it('should not initialize hover animation if enableHoverAnimations is false', () => {
    component.enableHoverAnimations.set(false);
    spyOn(directive as any, 'elementRef').and.returnValue(
      directive['elRef'].nativeElement,
    );
    spyOn(directive as any, 'initHoverAnimation').and.callThrough();

    directive.ngOnInit();

    expect((directive as any).initHoverAnimation).toHaveBeenCalled();
    expect(
      directive['elRef'].nativeElement.classList.contains('light-effect'),
    ).toBe(false);
  });

  it('should add "light-effect" class on hover and remove after delay', async () => {
    component.enableHoverAnimations.set(true);
    fixture.detectChanges();

    directive['initHoverAnimation']();
    const manager = directive['manager'];

    spyOn(manager.activeAnimation$, 'next').and.callThrough();

    // Simulate mouseenter event
    directive['elementRef'].dispatchEvent(new Event('mouseenter'));

    // Simulate no active animation
    manager.activeAnimation$.next(false);

    // Wait for delayBetweenAnimations
    await sleep(1);

    const classList = directive['elementRef'].classList;

    expect(classList.contains('light-effect')).toBeTrue(); // Class should be added
    expect(manager.activeAnimation$.next).toHaveBeenCalledWith(true);

    await sleep(manager.delayBetweenAnimations);
    expect(classList.contains('light-effect')).toBeFalse(); // Class should be removed
    expect(manager.activeAnimation$.next).toHaveBeenCalledWith(false);
  });
});
