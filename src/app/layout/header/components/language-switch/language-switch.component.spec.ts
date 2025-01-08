import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WINDOW } from 'src/app/core/providers/window.provider';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { LanguageSwitchComponent } from './language-switch.component';

describe('LanguageSwitchComponent', () => {
  let component: LanguageSwitchComponent;
  let fixture: ComponentFixture<LanguageSwitchComponent>;
  let documentMock: Document;
  let windowMock: Window;

  beforeEach(async () => {
    documentMock = document;
    windowMock = {
      location: {
        href: '/',
      },
    } as any;
    await TestBed.configureTestingModule({
      imports: [LanguageSwitchComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        { provide: WINDOW, useValue: windowMock },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.showLanguage()).toBeFalse();
    expect(component.activeLanguage().iso2).toEqual('en');
  });

  it('should toggle showLanguage signal', () => {
    component.showLanguage.set(true);
    expect(component.showLanguage()).toBeTrue();
    component.showLanguage.set(false);
    expect(component.showLanguage()).toBeFalse();
  });

  it('should change language correctly', () => {
    const newLanguage = { iso2: 'de', short: 'DE', name: 'German' };
    component['window'].location.href = '/en/test'
    component.changeLanguage(newLanguage);
    expect(component['window'].location.href).toEqual('/de/test');
  });

  it('should close dropdown on outside click', () => {
    component.showLanguage.set(true);
    documentMock.dispatchEvent(new Event('click'));
    expect(component.showLanguage()).toBeFalse();
  });
});
