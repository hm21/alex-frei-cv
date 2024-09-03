import { DOCUMENT } from '@angular/common';
import { Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalManager } from 'src/app/services/modal-manager/modal-manager.service';
import { renderer2Mock } from 'src/test/mocks/renderer2.mock';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let documentMock: Document;

  beforeEach(async () => {
    /*  modalManagerServiceMock = {
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
    }; */

    documentMock = document;

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        {
          provide: Renderer2,
          useValue: renderer2Mock,
        },
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalManager,
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
