import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeDateBannerComponent } from './resume-date-banner.component';

describe('ResumeDateBannerComponent', () => {
  let component: ResumeDateBannerComponent;
  let fixture: ComponentFixture<ResumeDateBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeDateBannerComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeDateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
