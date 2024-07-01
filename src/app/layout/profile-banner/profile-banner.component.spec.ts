import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2 } from '@angular/core';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { HeaderComponent } from '../header/header.component';
import { ProfileBannerComponent } from './profile-banner.component';

describe('ProfileBannerComponent', () => {
  let component: ProfileBannerComponent;
  let fixture: ComponentFixture<ProfileBannerComponent>;

  beforeEach(async () => {
    const elementRefMock = { nativeElement: document.createElement('div') };
    const renderer2Mock = {};

    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, ProfileBannerComponent],
      providers: [
        HeaderComponent,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: renderer2Mock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
