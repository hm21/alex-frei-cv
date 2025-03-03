import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let service: ThemeManagerService;
  let documentMock: any;

  beforeEach(() => {
    documentMock = document.implementation.createHTMLDocument();
    spyOn(documentMock.documentElement, 'setAttribute');

    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ThemeManagerService,
        { provide: DOCUMENT, useValue: documentMock },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(ThemeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme to dark mode', () => {
    service.isDarkMode.set(true);
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'dark',
    );
  });

  it('should toggle theme to light mode', () => {
    service.isDarkMode.set(false);
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('light');
    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'light',
    );
  });

  it('should set theme to light mode', () => {
    service.setLightMode();

    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'light',
    );
  });

  it('should set theme to dark mode', () => {
    service.setDarkMode();

    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'dark',
    );
  });
});
