import { Component } from '@angular/core';
import { ImageVideoChooserComponent } from 'src/app/shared/components/image-video-chooser/image-video-chooser.component';
import { Modal } from '../../modal.base';
import { ModalImagePreviewData } from '../../utils/modal.interface';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
  selector: 'af-modal-image-viewer',
  imports: [ModalHeaderComponent, ImageVideoChooserComponent],
  templateUrl: './modal-image-viewer.component.html',
  styleUrls: [
    './modal-image-viewer.component.scss',
    '../../styles/modal-animation.style.scss',
  ],
  host: {
    '[class.open-hero]': 'isHeroActive()',
    '[class.leave]': 'modalFadeOut()',
    '[style.--enter-duration.ms]': 'modalAnimationDurationIn()',
    '[style.--leave-duration.ms]': 'modalAnimationDurationOut()',
  },
})
export class ModalImageViewerComponent extends Modal<ModalImagePreviewData> {}
