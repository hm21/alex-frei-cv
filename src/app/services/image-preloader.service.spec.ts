import { TestBed } from '@angular/core/testing';

import { provideServiceWorker } from '@angular/service-worker';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImagePreloaderService } from './image-preloader.service';

describe('ImagePreloaderService', () => {
  let service: ImagePreloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      providers: [provideServiceWorker('ngsw-worker.js')],
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(ImagePreloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
