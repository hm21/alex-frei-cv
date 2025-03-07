import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImageFormatSupportService } from './image-format-support.service';

describe('ImageFormatSupportService', () => {
  let service: ImageFormatSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(ImageFormatSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return result from already checked formats', async () => {
    service['support'] = { avif: true, webP: false };

    const isAvifSupported = service.isAvifSupported;
    expect(isAvifSupported).toBeTrue();

    const isWebpSupported = service.isWebpSupported;
    expect(isWebpSupported).toBeFalsy();
  });
});
