import {
  Component,
  ElementRef,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { NgxImageHeroDirective } from 'ngx-image-hero';
import { ModalPreviewItem } from 'src/app/ui/modal/utils/modal.interface';
import { ImageLoaderDirective } from '../../directives/image-loader/image-loader.directive';

@Component({
  selector: 'af-image-video-chooser',
  imports: [ImageLoaderDirective, NgxImageHeroDirective],
  template: `
    @if (item().isVideo) {
      <video
        #videoRef
        [style.aspectRatio]="item().ratio ?? '16 / 9'"
        [style.backgroundColor]="item().backgroundColor ?? 'white'"
        [autoplay]="item().disableVideoAutoplay ? false : true"
        muted
        controls
        loop
        [src]="item().path"
      ></video>
    } @else {
      <picture [style.backgroundColor]="item().backgroundColor ?? 'white'">
        <source srcset="{{item().path}}_1x.avif" type="image/avif" />
        <source srcset="{{item().path}}_1x.webp" type="image/webp" />
        <source srcset="{{item().path}}_1x.jpeg" type="image/jpeg" />

        <img
          loading="eager"
          [style.aspectRatio]="item().ratio ?? '16 / 9'"
          afImageLoader
          ngxHero
          backdropPosition="beforeHeroItem"
          [highQualityPath]="item().path + '_4x'"
          [supportedFormats]="supportedFormats()"
          [src]="item().path + '_4x.jpeg'"
          [alt]="item().alt"
          (openHero)="openHero.emit()"
          (closeHero)="closeHero.emit()"
        />
      </picture>
    }
  `,
  styles: `
    :host,
    picture {
      display: block;
    }
    img {
      min-height: 100px;
      object-fit: contain;
    }
    :host,
    img,
    video,
    picture {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    picture {
      border: 1px solid var(--border-color);
    }
  `,
  host: {
    class: 'af-image-video-chooser',
  },
})
export class ImageVideoChooserComponent implements OnDestroy {
  public item = input.required<ModalPreviewItem>();
  public supportedFormats = input<string[]>(['avif', 'webp', 'jpeg']);

  public openHero = output();
  public closeHero = output();

  private videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoRef');

  ngOnDestroy(): void {
    // Explicitly stop video and cancel buffering
    const video = this.videoRef()?.nativeElement;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load(); // cancels download
    }
  }
}
