import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('toggleMenu', () => {
    it('should toggle showMobileMenu value', () => {
      expect(service.showMobileMenu()).toBeFalse();
      service.toggleMenu();
      expect(service.showMobileMenu()).toBeTrue();
      service.toggleMenu();
      expect(service.showMobileMenu()).toBeFalse();
    });

    it('should update document.body.style.overflow when opening menu', () => {
      const style = service['document'].body.style;
      service.toggleMenu();
      expect(style.overflow).toBe('hidden');
    });

    it('should remove document.body.style.overflow when closing menu', () => {
      const style = service['document'].body.style;
      service.toggleMenu(); // open
      service.toggleMenu(); // close
      expect(style.overflow).toBe('');
    });
  });

  describe('closeMenu', () => {
    it('should set showMobileMenu to false', () => {
      service.showMobileMenu.set(true);
      service.closeMenu();
      expect(service.showMobileMenu()).toBeFalse();
    });

    it('should remove document.body.style.overflow', () => {
      const style = service['document'].body.style;
      service.showMobileMenu.set(true);
      style.overflow = 'hidden';
      service.closeMenu();
      expect(style.overflow).toBe('');
    });
  });
});
