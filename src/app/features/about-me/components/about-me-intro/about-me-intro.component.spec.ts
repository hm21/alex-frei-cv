import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { AboutMeIntroComponent } from './about-me-intro.component';

describe('AboutMeIntroComponent', () => {
  let component: AboutMeIntroComponent;
  let fixture: ComponentFixture<AboutMeIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeIntroComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
