import { Renderer2, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { renderer2Mock } from 'src/test/mocks/renderer2.mock';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalManager } from './modal-manager.service';

describe('ModalManagerService', () => {
  let service: ModalManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        {
          provide: Renderer2,
          useValue: renderer2Mock,
        },
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalManager,
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(ModalManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
