import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { Modal } from './modal.base';
import { ModalService } from './modal.service';

@Component({
  selector: 'af-mock-modal',
  template: '<div>Mock Modal</div>',
})
class MockModalComponent extends Modal<unknown> {}

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*   describe('constructor', () => {
    it('should create ModalComponent when in browser', () => {
      expect(viewContainerRefMock.createComponent).toHaveBeenCalledWith(
        ModalComponent,
      );
      expect(modalComponentInstanceMock.onClose.subscribe).toHaveBeenCalled();
    });

    it('should not create ModalComponent when not in browser', () => {
      // Re-initialize with IS_BROWSER as false
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ModalService,
          { provide: MODAL_VIEW_CONTAINER_REF, useValue: viewContainerRefMock },
          { provide: IdManagerService, useValue: idManagerServiceMock },
          { provide: LoggerService, useValue: loggerServiceMock },
          { provide: IS_BROWSER, useValue: false },
        ],
      });

      service = TestBed.inject(ModalService);

      expect(viewContainerRefMock.createComponent).not.toHaveBeenCalled();
    });
  }); */

  it('should open a modal', () => {
    service.onChangeState$.subscribe((state) => {
      expect(state).toBe('open');
    });

    service.open(MockModalComponent);
  });

  it('should close a modal', () => {
    service.open(MockModalComponent);
    service.onChangeState$.subscribe((state) => {
      expect(state).toBe('close');
    });

    service.close('unique-id');
  });
});
