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

  it('should support AVIF format', async () => {
    const isSupported = await service.isAvifSupported();
    expect(isSupported).toBe(true);
  });

  it('should support WebP format', async () => {
    const isSupported = await service.isWebpSupported();
    expect(isSupported).toBe(true);
  });

  it('should not support an unsupported format', async () => {
    const isSupported = await service['supportsFormat']('unsupported');
    expect(isSupported).toBe(false);
  });

  it('should return result from already checked formats', async () => {
    service['checkedFormats'] = { avif: true, webp: false };

    const isAvifSupported = await service.isAvifSupported();
    expect(isAvifSupported).toBe(true);

    const isWebpSupported = await service.isWebpSupported();
    expect(isWebpSupported).toBeFalsy();
  });
});
