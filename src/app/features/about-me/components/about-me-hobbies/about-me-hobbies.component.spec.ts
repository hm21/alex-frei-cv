import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { AboutMeHobbiesComponent } from './about-me-hobbies.component';

describe('AboutMeHobbiesComponent', () => {
  let component: AboutMeHobbiesComponent;
  let fixture: ComponentFixture<AboutMeHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeHobbiesComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
