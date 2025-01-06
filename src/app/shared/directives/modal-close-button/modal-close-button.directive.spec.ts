import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import svgClose from 'src/assets/img/icon/close.svg';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalCloseButtonDirective } from './modal-close-button.directive';

describe('ModalCloseButtonDirective', () => {
    let directive: ModalCloseButtonDirective;
    let elementRef: ElementRef<HTMLButtonElement>;

    beforeEach(() => {
      elementRef = new ElementRef(document.createElement('button'));

      TestBed.configureTestingModule({
        teardown: { destroyAfterEach: false },
        imports: [SharedTestingModule],
        providers: [{ provide: ElementRef, useValue: elementRef }],
      });

      TestBed.runInInjectionContext(() => {
        directive = new ModalCloseButtonDirective();
      });
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should set innerHTML to svgClose on ngOnInit', () => {
      directive.ngOnInit();
      expect(elementRef.nativeElement.innerHTML).toBe(svgClose);
    });
});
