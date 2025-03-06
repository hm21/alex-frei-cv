import { Component } from '@angular/core';
import { modalAnimation } from 'src/app/shared/animations/modal-animations';
import { ImageVideoChooserComponent } from 'src/app/shared/components/image-video-chooser/image-video-chooser.component';
import { Modal } from '../../modal.base';
import { ModalImagePreviewData } from '../../utils/modal.interface';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
  selector: 'af-modal-image-viewer',
  imports: [ModalHeaderComponent, ImageVideoChooserComponent],
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
