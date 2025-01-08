import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { WINDOW } from 'src/app/core/providers/window.provider';
import { ToastService } from 'src/app/ui/toast/services/toast.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { LanguageSwitchComponent } from '../header/components/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../header/components/theme-switch/theme-switch.component';
import { HeaderComponent } from '../header/header.component';
import { ProfileBannerComponent } from './profile-banner.component';

describe('ProfileBannerComponent', () => {
  describe('Desktop view', () => {
    let component: ProfileBannerComponent;
    let fixture: ComponentFixture<ProfileBannerComponent>;

    beforeEach(async () => {
      const elementRefMock = { nativeElement: document.createElement('div') };

      await TestBed.configureTestingModule({
        imports: [SharedTestingModule, ProfileBannerComponent],
        providers: [
          HeaderComponent,
          ToastService,
          { provide: ElementRef, useValue: elementRefMock },
          {
            provide: WINDOW,
            useValue: {
              ...window,
              innerWidth: 1200,
              innerHeight: 800,
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfileBannerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should clear navigation items', () => {
      spyOn(component['navItemsRef'](), 'clear');
      spyOn(component['languageContainerRef'](), 'clear');
      spyOn(component['themeContainerRef'](), 'clear');

      (component as any).checkMobileMenuItems();

      expect(component['navItemsRef']().clear).toHaveBeenCalled();
      expect(component['languageContainerRef']().clear).toHaveBeenCalled();
      expect(component['themeContainerRef']().clear).toHaveBeenCalled();
    });
  });

  describe('Mobile view', () => {
    let component: ProfileBannerComponent;
    let fixture: ComponentFixture<ProfileBannerComponent>;

    beforeEach(async () => {
      const elementRefMock = { nativeElement: document.createElement('div') };

      await TestBed.configureTestingModule({
        imports: [
          SharedTestingModule,
          ThemeSwitchComponent,
          LanguageSwitchComponent,
          ProfileBannerComponent,
        ],
        providers: [
          HeaderComponent,
          ToastService,
          { provide: ElementRef, useValue: elementRefMock },
          {
            provide: WINDOW,
            useValue: {
              ...window,
              innerWidth: 500,
              innerHeight: 400,
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfileBannerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should clear navigation items', () => {
      component['navItemsRef']().clear();
      component['languageContainerRef']().clear();
      component['themeContainerRef']().clear();

      component['checkMobileMenuItems']();

      expect(component['navItemsRef']().length).toBeGreaterThanOrEqual(1);
      expect(component['languageContainerRef']().length).toBeGreaterThanOrEqual(
        1,
      );
      expect(component['themeContainerRef']().length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Default view', () => {
    let component: ProfileBannerComponent;
    let fixture: ComponentFixture<ProfileBannerComponent>;
    let httpMock: HttpTestingController;
    let toastService: ToastService;
    let windowMock: Window;

    beforeEach(async () => {
      const elementRefMock = { nativeElement: document.createElement('div') };

      await TestBed.configureTestingModule({
        imports: [SharedTestingModule, ProfileBannerComponent],
        providers: [
          HeaderComponent,
          ToastService,
          { provide: ElementRef, useValue: elementRefMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfileBannerComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
      toastService = TestBed.inject(ToastService);
      windowMock = TestBed.inject(WINDOW);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should listen to screen resize events', async () => {
      spyOn(component as any, 'checkMobileMenuItems');
      windowMock.dispatchEvent(new Event('resize'));
      /// sleep 50ms for debounce time
      await sleep(50);
      expect((component as any).checkMobileMenuItems).toHaveBeenCalled();
    });

    it('should download PDF successfully', () => {
      const mockBlob = new Blob([''], { type: 'application/pdf' });
      spyOn(toastService, 'success');

      // Mock the anchor element to prevent the actual download
      const anchorElement = document.createElement('a');
      spyOn(document, 'createElement').and.returnValue(anchorElement);
      spyOn(anchorElement, 'click'); // Mock the click function to prevent download

      component.downloadPdf();

      const req = httpMock.expectOne('assets/docs/alex_frei_cv.pdf');
      expect(req.request.method).toBe('GET');
      req.flush(mockBlob); // Simulate the response with the mock blob

      // Verify the anchor element and download setup
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(anchorElement.href).toContain('blob:'); // Ensure blob URL is set
      expect(anchorElement.download).toBe('alex_frei_cv.pdf');
      expect(anchorElement.click).toHaveBeenCalled(); // Ensure the click method was called

      // Verify success toast message
      expect(toastService.success).toHaveBeenCalledWith(
        $localize`Download Successful`,
      );
    });

    it('should close the side menu', () => {
      const toggleBtnSpy = spyOn(
        component['header'],
        'toggleBtn',
      ).and.returnValue({
        closeMenu: jasmine.createSpy('closeMenu'),
      } as any);

      component.closeSideMenu();

      expect(toggleBtnSpy).toHaveBeenCalled();
    });

    it('should handle download PDF error', () => {
      spyOn(toastService, 'error');

      component.downloadPdf();

      const req = httpMock.expectOne('assets/docs/alex_frei_cv.pdf');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error')); // Simulate an error response

      // Verify error toast message
      expect(toastService.error).toHaveBeenCalled();
    });
  });

  describe('Server', () => {
    let component: ProfileBannerComponent;
    let fixture: ComponentFixture<ProfileBannerComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      const elementRefMock = { nativeElement: document.createElement('div') };

      await TestBed.configureTestingModule({
        imports: [SharedTestingModule, ProfileBannerComponent],
        providers: [
          HeaderComponent,
          ToastService,
          { provide: ElementRef, useValue: elementRefMock },
          { provide: IS_BROWSER, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfileBannerComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should not create mobile items', async () => {
      component['checkMobileMenuItems']();

      expect(component['navItemsRef']().length).toBe(0);
    });
  });
});
