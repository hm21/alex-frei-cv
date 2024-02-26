import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTimelineItemComponent } from './resume-timeline-item.component';

describe('ResumeTimelineItemComponent', () => {
  let component: ResumeTimelineItemComponent;
  let fixture: ComponentFixture<ResumeTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTimelineItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
