import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSkillCardComponent } from './resume-skill-card.component';

describe('ResumeSkillCardComponent', () => {
  let component: ResumeSkillCardComponent;
  let fixture: ComponentFixture<ResumeSkillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSkillCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSkillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
