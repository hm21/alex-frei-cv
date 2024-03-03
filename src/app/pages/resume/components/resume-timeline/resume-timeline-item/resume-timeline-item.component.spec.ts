import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeTimelineItem } from '../../../utils/resume-interface';
import { ResumeTimelineItemComponent } from './resume-timeline-item.component';

describe('ResumeTimelineItemComponent', () => {
  let component: ResumeTimelineItemComponent;
  let fixture: ComponentFixture<ResumeTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTimelineItemComponent, SharedTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeTimelineItemComponent);
    component = fixture.componentInstance;
    const mockItem: ResumeTimelineItem = {
      date: '2021',
      title: 'Test Title',
      msg: 'Test Message',
    };
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
