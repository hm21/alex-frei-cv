import { INJECTOR } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ResumeTimelineItemComponent } from './resume-timeline-item.component';

describe('ResumeTimelineItemComponent', () => {
  let component: ResumeTimelineItemComponent;
  let fixture: ComponentFixture<ResumeTimelineItemComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);

    await TestBed.configureTestingModule({
      imports: [ResumeTimelineItemComponent, SharedTestingModule],
      providers: [{ provide: ModalService, useValue: modalServiceSpy }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add sonar-animation class on mouseenter and remove on animationend', async () => {
    fixture.detectChanges();

    const nativeElement = component.nativeElement;
    const event = new Event('mouseenter');
    nativeElement.dispatchEvent(event);

    expect(component['sonar']().nativeElement.classList).toContain(
      'sonar-animation',
    );

    const animationEndEvent = new Event('animationend');
    component['sonar']().nativeElement.dispatchEvent(animationEndEvent);

    expect(component['sonar']().nativeElement.classList).not.toContain(
      'sonar-animation',
    );
  });

  it('should open project details modal when showMore is called with projectDetails', () => {
    fixture.componentRef.setInput('more', {
      projectDetails: { title: 'Test Project' },
    });

    component['injector'] = TestBed.inject(INJECTOR);
    component['showMore']();

    expect(modalService.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { title: 'Test Project' },
        injector: component['injector'],
      }),
    );
  });

  it('should open image preview modal when showMore is called with imagePreview', () => {
    fixture.componentRef.setInput('more', {
      imagePreview: { src: 'test.jpg' },
    });

    component['injector'] = TestBed.inject(INJECTOR);
    component['showMore']();

    expect(modalService.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { src: 'test.jpg' },
        injector: component['injector'],
      }),
    );
  });

  it('should throw an error when showMore is called without projectDetails or imagePreview', () => {
    fixture.componentRef.setInput('more', {});

    expect(() => component['showMore']()).toThrowError(
      'No project details or image preview provided.',
    );
  });
});
