import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalCloseButtonDirective } from './modal-close-button.directive';

describe('ModalCloseButtonDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: new ElementRef('') },
      ],
    });
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ModalCloseButtonDirective();
      expect(directive).toBeTruthy();
    });
  });
});
