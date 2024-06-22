import { DestroyRef, ElementRef, Renderer2 } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImageLoaderDirective } from './image-loader.directive';

describe('ImageLoaderDirective', () => {
  let elRefMock: ElementRef;
  let rendererMock: Renderer2;
  let parentElement: HTMLElement;
  let imageElement: HTMLImageElement;

  beforeEach(() => {
    parentElement = document.createElement('div');
    imageElement = document.createElement('img');
    parentElement.appendChild(imageElement);

    elRefMock = new ElementRef(imageElement);
    rendererMock = jasmine.createSpyObj('Renderer2', [
      'addClass',
      'removeClass',
      'parentNode',
    ]);

    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: elRefMock },
        { provide: Renderer2, useValue: rendererMock },
      ],
    });
  });

  it('should create an instance', inject([DestroyRef, Renderer2], () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ImageLoaderDirective();
      expect(directive).toBeTruthy();
    });
  }));
});
