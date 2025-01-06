import { DestroyRef, ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { MockDefaultViewContainerRef } from 'src/test/mocks/view-container/default-view-container.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImageLoaderDirective } from './image-loader.directive';

describe('ImageLoaderDirective', () => {
  let elRefMock: ElementRef;
  let parentElement: HTMLElement;
  let imageElement: HTMLImageElement;

  beforeEach(() => {
    parentElement = document.createElement('div');
    imageElement = document.createElement('img');
    parentElement.appendChild(imageElement);

    elRefMock = new ElementRef(imageElement);

    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: elRefMock },
        { provide: ViewContainerRef, useClass: MockDefaultViewContainerRef },
      ],
    });
  });

  it('should create an instance', inject([DestroyRef], () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ImageLoaderDirective();
      expect(directive).toBeTruthy();
    });
  }));
});
