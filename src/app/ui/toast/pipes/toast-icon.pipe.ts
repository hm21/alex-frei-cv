import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import svgDanger from 'src/assets/img/icon/toast/danger.svg';
import svgInfo from 'src/assets/img/icon/toast/info.svg';
import svgSuccess from 'src/assets/img/icon/toast/success.svg';
import svgWarning from 'src/assets/img/icon/toast/warning.svg';
import { ToastType } from '../types/toast-types';

@Pipe({
  name: 'toastIcon',
  standalone: true,
})
export class ToastIconPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(type?: ToastType) {
    switch (type) {
      case 'success':
        return this.sanitizer.bypassSecurityTrustHtml(svgSuccess);
      case 'info':
        return this.sanitizer.bypassSecurityTrustHtml(svgInfo);
      case 'warning':
        return this.sanitizer.bypassSecurityTrustHtml(svgWarning);
      case 'danger':
        return this.sanitizer.bypassSecurityTrustHtml(svgDanger);
      default:
        return '';
    }
  }
}
