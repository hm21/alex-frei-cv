import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetails } from '../../utils/portfolio-interfaces';
import {
    ProjectDetailsComponent,
} from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let modalManagerServiceMock: Partial<ModalManagerService>;
  let modalManagerService: ModalManagerService;
  let documentMock: Document;

  beforeEach(async () => {
    modalManagerServiceMock = {
      modalData: {
        logo: '<svg></svg>',
        title: 'Lorem ipsum',
        subtitle: 'Lorem ipsum',
        description: `Lorem ipsum`,
        demoUrl: 'https://alex-frei.web.app',
        website: [
          {
            url: 'https://alex-frei.web.app',
            title: `Lorem ipsum`,
          },
        ],
        store: [],
        technology: {
          frontend: [
            {
              name: 'Lorem ipsum',
            },
          ],
          backend: [
            {
              name: 'Lorem ipsum',
            },
          ],
          prototype: [
            {
              name: 'Lorem ipsum',
            },
          ],
          other: [
            {
              name: 'Lorem ipsum',
            },
          ],
        },
        images: [],
      },
    };

    documentMock = document;

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent, SharedTestingModule],
      providers: [
        { provide: ModalManagerService, useValue: modalManagerServiceMock },
        { provide: DOCUMENT, useValue: documentMock },
      ],
      teardown: {destroyAfterEach: false} 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    modalManagerService = TestBed.inject(ModalManagerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set videoPlayerLoaded to true on video player loaded', () => {
    component.onVideoPlayerLoaded();
    expect(component.videoPlayerLoaded()).toBeTrue();
  });

  it('should return correct data', () => {
    const testData: ProjectDetails = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      description: 'Test Description',
      technology: {},
      images: [],
    };
    modalManagerService.modalData = testData;
    expect(component.data).toEqual(testData);
  });
});
