import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalService } from './modal.service';

describe('ModalManagerService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalService,
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});