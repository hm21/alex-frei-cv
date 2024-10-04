import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let documentMock: Document;

  beforeEach(async () => {
    documentMock = document;

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        ModalService,
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
});
