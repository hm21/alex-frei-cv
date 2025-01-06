import { DestroyRef, ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        {
          provide: ElementRef,
          useValue: '',
        },
      ],
    });
  });

  it('should create an instance', inject([DestroyRef], () => {
    TestBed.runInInjectionContext(() => {
      const directive = new TooltipDirective();
      expect(directive).toBeTruthy();
    });
  }));
});
