import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalService } from './modal.service';

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
});
