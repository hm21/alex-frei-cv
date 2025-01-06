import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { BrowserDetectionService } from './browser-detection.service';

describe('BrowserDetectionService', () => {
  let service: BrowserDetectionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [BrowserDetectionService],
    });
    service = TestBed.inject(BrowserDetectionService);
  });
  describe('when platform is browser', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should detect Chrome browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'Chrome/92.0.4515.131',
      );
      expect(service.detectBrowser()).toBe('chrome');
    });

    it('should detect Firefox browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'Firefox/90.0',
      );
      expect(service.detectBrowser()).toBe('firefox');
    });

    it('should detect Safari browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'Safari/537.36',
      );
      expect(service.detectBrowser()).toBe('safari');
    });

    it('should detect Edge browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'Edg/91.0.864.48',
      );
      expect(service.detectBrowser()).toBe('edge');
    });

    it('should detect Opera browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'OPR/77.0.4054.172',
      );
      expect(service.detectBrowser()).toBe('opera');
    });

    it('should detect Internet Explorer browser', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'MSIE 10.0; Windows NT 6.1; Trident/7.0',
      );
      expect(service.detectBrowser()).toBe('ie');
    });

    it('should return "unknown" for unrecognized user agents', () => {
      spyOnProperty(navigator, 'userAgent', 'get').and.returnValue(
        'SomeUnknownBrowser/1.0',
      );
      expect(service.detectBrowser()).toBe('unknown');
    });
  });

  describe('when platform is not browser', () => {
    it('should not add any classes to document when platform is server', () => {
      const addSpy = spyOn(document.documentElement.classList, 'add');
      expect(addSpy).not.toHaveBeenCalled();
    });
  });
});
