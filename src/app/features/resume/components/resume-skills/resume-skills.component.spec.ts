import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeSkillsComponent } from './resume-skills.component';

describe('ResumeSkillsComponent', () => {
  let component: ResumeSkillsComponent;
  let fixture: ComponentFixture<ResumeSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSkillsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
