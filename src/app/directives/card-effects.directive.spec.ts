import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { CardEffectsDirective } from './card-effects.directive';

describe('CardEffectsDirective', () => {
  let elRefMock: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: elRefMock },
      ],
    });
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new CardEffectsDirective();
      expect(directive).toBeTruthy();
    });
  });
});
