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
      teardown: {destroyAfterEach: false} 
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
  
    expect(component.activeLanguage.iso2).toEqual('en');
  });
});
