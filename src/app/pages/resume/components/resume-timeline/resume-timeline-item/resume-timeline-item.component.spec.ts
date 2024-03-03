import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeTimelineItemComponent } from './resume-timeline-item.component';

describe('ResumeTimelineItemComponent', () => {
  let component: ResumeTimelineItemComponent;
  let fixture: ComponentFixture<ResumeTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTimelineItemComponent, SharedTestingModule]
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
