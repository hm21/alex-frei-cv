import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalManagerService } from './modal-manager.service';

describe('ModalManagerService', () => {
  let service: ModalManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: {destroyAfterEach: false} 
    });
    service = TestBed.inject(ModalManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal', () => {
    const mockComponent = { name: 'MockComponent' };
    const mockData = { data: { id: 123 } };

    service.openModal(mockComponent, mockData);

    expect(service.modalData).toEqual(mockData.data);
    service.modal$.subscribe((modal) => {
      expect(modal.type).toBe('add');
      expect(modal.component).toBe(mockComponent);
    });
  });

  it('should close modal', () => {
    service.closeModal();

    expect(service.modalData).toBeUndefined();
    service.modal$.subscribe((modal) => {
      expect(modal.type).toBe('remove');
    });
  });
});
