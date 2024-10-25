import {
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, takeUntil } from 'rxjs';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerMode } from '../components/progress-spinner/utils/progress-spinner.type';
import { ImagePreloaderService } from '../services/image-manager/image-preloader.service';

@Directive({
  selector: '[afImageLoader]',
  standalone: true,
})
export class ImageLoaderDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLImageElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);
  private containerRef = inject(ViewContainerRef);
  private preloader = inject(ImagePreloaderService);

  private spinnerCmp?: ComponentRef<ProgressSpinnerComponent>;

  private xhr = new XMLHttpRequest();

  ngOnInit() {
    this.loadImageWithProgress();
  }

  ngOnDestroy(): void {
    if (this.xhr.readyState !== XMLHttpRequest.DONE) {
      this.xhr.abort();
      this.el.nativeElement.src = '';
    }
  }

  private loadImageWithProgress() {
    this.buildSpinnerComponent();

    const imgElement = this.el.nativeElement;
    const url = imgElement.src;
    const parent = imgElement.parentElement;

    if (parent) {
      parent.classList.add('skeleton-loading');

      this.xhr.open('GET', url, true);
      this.xhr.responseType = 'blob';

      this.xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100,
          );
          this.spinnerCmp!.setInput('value', percentComplete);
        }
      };

      this.xhr.onload = async () => {
        if (this.xhr.status === 200) {
          /// Ensure image will added to the service worker and memory-cache
          await this.preloader.preloadImages([imgElement.src]);

          const blob = this.xhr.response;
          const imgUrl = URL.createObjectURL(blob);
          imgElement.src = imgUrl;

          fromEvent(imgElement, 'load')
            .pipe(
              takeUntil(fromEvent(imgElement, 'error')),
              takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => {
              this.spinnerCmp?.destroy();
              parent.classList.remove('skeleton-loading');
            });
        }
      };

      this.xhr.send();
    }
  }

  private buildSpinnerComponent() {
    this.spinnerCmp = this.containerRef.createComponent(
      ProgressSpinnerComponent,
    );
    const mode: ProgressSpinnerMode = 'determinate';
    this.spinnerCmp!.setInput('mode', mode);
    this.spinnerCmp!.setInput('diameter', 50);
    this.spinnerCmp!.setInput('diameter', 50);

    const elRef = this.spinnerCmp.location.nativeElement as HTMLElement;
    elRef.style.position = 'absolute';
    elRef.style.top = '50%';
    elRef.style.left = '50%';
    elRef.style.transform = 'translate(-50%, -50%)';
    elRef.style.zIndex = '7';
  }
}
