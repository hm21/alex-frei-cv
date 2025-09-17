import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROJECT_SNAPTAB } from 'src/app/core/constants/projects/project-snaptab.constants';
import { ToastService } from 'src/app/ui/toast/services/toast.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let documentMock: Document;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    documentMock = document;
    toastServiceMock = jasmine.createSpyObj('ToastService', ['success']);

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    fixture.componentRef.setInput('data', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set videoPlayerLoaded to true on video player loaded', () => {
    component.onVideoPlayerLoaded();
    expect(component.videoPlayerLoaded()).toBeTrue();
  });

  it('should copy text to clipboard and show success toast', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    await component.copy('test text');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(toastServiceMock.success).toHaveBeenCalledWith($localize`Copied`);
  });

  it('should remove box-shadow from header when scroll position is less than or equal to 3 pixels', () => {
    const sectionEl = document.createElement('div');
    const headerEl = document.createElement('div');
    spyOn(component['sectionRef'](), 'nativeElement' as any).and.returnValue(
      sectionEl,
    );
    spyOn(component['headerRef'](), 'nativeElement').and.returnValue(headerEl);

    sectionEl.scrollTop = 2;
    sectionEl.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(headerEl.style.boxShadow).toBe('');
  });

  it('should create detail infos for website, store, video, and technology', () => {
    spyOn(component['websiteContainer'](), 'createEmbeddedView');
    spyOn(component['videoContainer'](), 'createEmbeddedView');
    spyOn(component['technologyContainer'](), 'createEmbeddedView');

    fixture.componentRef.setInput('data', PROJECT_SNAPTAB);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component['createDetailInfos']();

    expect(
      component['websiteContainer']().createEmbeddedView,
    ).toHaveBeenCalled();
    expect(component['videoContainer']().createEmbeddedView).toHaveBeenCalled();
    expect(
      component['technologyContainer']().createEmbeddedView,
    ).toHaveBeenCalled();
  });
});
