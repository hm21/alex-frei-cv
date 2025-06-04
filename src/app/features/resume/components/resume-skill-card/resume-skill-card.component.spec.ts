import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KNOWLEDGE } from 'src/app/shared/constants/resume/resume-skills.constants';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeSkillCardComponent } from './resume-skill-card.component';

describe('ResumeSkillCardComponent', () => {
  let component: ResumeSkillCardComponent;
  let fixture: ComponentFixture<ResumeSkillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSkillCardComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeSkillCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', KNOWLEDGE[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the required input "item"', () => {
    expect(component.item).toBeDefined();
  });

  it('should render the skill card with the provided item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Assuming the template uses item.name somewhere
    expect(compiled.textContent).toContain(KNOWLEDGE[0].name);
  });

  it('should update the view when the input "item" changes', () => {
    const newItem = { ...KNOWLEDGE[1] };
    fixture.componentRef.setInput('item', newItem);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(newItem.name);
  });
});
