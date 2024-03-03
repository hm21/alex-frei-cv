import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { LanguageSwitchComponent } from './language-switch.component';

describe('LanguageSwitchComponent', () => {
  let component: LanguageSwitchComponent;
  let fixture: ComponentFixture<LanguageSwitchComponent>;
  let documentMock: Document;

  beforeEach(async () => {
    documentMock = document;
    await TestBed.configureTestingModule({
      imports: [LanguageSwitchComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
      ],
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
    expect(component.showLanguage).toBeFalse();
    expect(component.languages).toEqual([
      { iso2: 'en', iso3: 'Eng', name: 'English' },
      { iso2: 'de', iso3: 'Deu', name: 'Deutsch' },
    ]);
    expect(component.activeLanguage).toEqual({
      iso2: 'en',
      iso3: 'Eng',
      name: 'English',
    });
  });
});
