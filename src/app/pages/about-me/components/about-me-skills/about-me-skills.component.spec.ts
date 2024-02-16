import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSkillsComponent } from './about-me-skills.component';

describe('AboutMeSkillsComponent', () => {
  let component: AboutMeSkillsComponent;
  let fixture: ComponentFixture<AboutMeSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
