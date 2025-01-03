import { Component } from '@angular/core';
import { NgxImageHeroDirective } from 'ngx-image-hero';
import { modalAnimation } from 'src/app/animations/modal-animations';
import { ImageLoaderDirective } from 'src/app/directives/image-loader.directive';
import { Modal } from '../../modal.base';
import { ModalImagePreviewData } from '../../utils/modal.interface';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
  selector: 'af-modal-image-viewer',
  imports: [ModalHeaderComponent, NgxImageHeroDirective, ImageLoaderDirective],
  templateUrl: './modal-image-viewer.component.html',
  styleUrl: './modal-image-viewer.component.scss',
  animations: [modalAnimation],
  host: {
    '[class.open-hero]': 'isHeroActive()',
    '[@modal]': `{
        value: this.modalFadeOut() ? 'out' : 'in',
        params: {
          durationIn: this.modalAnimationDurationIn(),
          durationOut: this.modalAnimationDurationOut(),
        },
      }`,
  },
})
export class ModalImageViewerComponent extends Modal<ModalImagePreviewData> {}
