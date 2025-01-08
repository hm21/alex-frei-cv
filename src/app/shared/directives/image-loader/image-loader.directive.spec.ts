import { DOCUMENT } from '@angular/common';
import { DestroyRef, ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ImagePreloaderService } from 'src/app/core/services/image-manager/image-preloader.service';
import { MockDefaultViewContainerRef } from 'src/test/mocks/view-container/default-view-container.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImageLoaderDirective } from './image-loader.directive';

describe('ImageLoaderDirective', () => {
  let elRefMock: ElementRef;
  let parentElement: HTMLElement;
  let imageElement: HTMLImageElement;
  let imagePreloaderServiceMock: jasmine.SpyObj<ImagePreloaderService>;
  let documentMock: Document;

  beforeEach(() => {
    parentElement = document.createElement('div');
    imageElement = document.createElement('img');
    parentElement.appendChild(imageElement);

    elRefMock = new ElementRef(imageElement);
    imagePreloaderServiceMock = jasmine.createSpyObj('ImagePreloaderService', [
      'preferredImageFormat',
    ]);
    documentMock = document;

    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: elRefMock },
        { provide: ViewContainerRef, useClass: MockDefaultViewContainerRef },
        { provide: ImagePreloaderService, useValue: imagePreloaderServiceMock },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });
  });

  it('should create an instance', inject([DestroyRef], () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ImageLoaderDirective();
      expect(directive).toBeTruthy();
    });
  }));

  it('should initialize skeleton loading style on parent element', inject(
    [DestroyRef],
    () => {
      TestBed.runInInjectionContext(() => {
        const directive = new ImageLoaderDirective();
        directive.ngOnInit();
        expect(parentElement.classList).toContain('skeleton-loading');
      });
    },
  ));

  it('should create and insert frosted background and glass overlay', inject(
    [DestroyRef],
    () => {
      TestBed.runInInjectionContext(() => {
        const directive = new ImageLoaderDirective();
        directive.ngOnInit();
        const frostedBackground = parentElement.querySelector(
          '.frosted-background',
        );
        const frostedGlass = parentElement.querySelector('.frosted-glass');
        expect(frostedBackground).toBeTruthy();
        expect(frostedGlass).toBeTruthy();
      });
    },
  ));

  it("should return if parent element didn't exists", inject(
    [DestroyRef],
    () => {
      TestBed.runInInjectionContext(() => {
        const directive = new ImageLoaderDirective();
        directive['el'] = new ElementRef(document.createElement('div'));
        directive.ngOnInit();
     
        expect(directive['el'].nativeElement.parentElement).toBeNull();
      });
    },
  ));
});
