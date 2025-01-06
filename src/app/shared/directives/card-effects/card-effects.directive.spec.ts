import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { CardEffectManagerService } from 'src/app/core/services/card-effect-manager/card-effect-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { CardEffectsDirective } from './card-effects.directive';

 
  describe('CardEffectsDirective', () => {
    let directive: CardEffectsDirective;
    let cardEffectManagerService: CardEffectManagerService;
 
    beforeEach(() => {
      const divElement = document.createElement('div');
      const elRefMock = new ElementRef(divElement);

      TestBed.configureTestingModule({
        teardown: { destroyAfterEach: false },
        imports: [SharedTestingModule],
        providers: [
          { provide: ElementRef, useValue: elRefMock },
          { provide: IS_BROWSER, useValue: true },
          CardEffectManagerService,
         ],
      });

      cardEffectManagerService = TestBed.inject(CardEffectManagerService);
 
      TestBed.runInInjectionContext(() => {
        directive = new CardEffectsDirective();
      });
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
    expect(cardEffectManagerService.addElement).toHaveBeenCalledWith((directive as any).animationElement);
  });

  it('should remove animation element on destroy', () => {
    spyOn(cardEffectManagerService, 'removeElement');
    spyOn(cardEffectManagerService.activeAnimation$, 'next');

    directive.ngOnDestroy();

    expect(cardEffectManagerService.activeAnimation$.next).toHaveBeenCalledWith(false);
    expect(cardEffectManagerService.removeElement).toHaveBeenCalledWith((directive as any).animationElement);
  });  
});