import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import svgApps from 'src/assets/img/icon/apps.svg';
import svgBackend from 'src/assets/img/icon/backend.svg';
import svgDesign from 'src/assets/img/icon/design.svg';
import svgWebsite from 'src/assets/img/icon/website.svg';
import { ServiceCardIcon } from '../types/service-card-type';

@Pipe({
  name: 'serviceIcon',
})
export class ServiceIconPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(icon: ServiceCardIcon) {
    switch (icon) {
      case 'website':
        return this.sanitizer.bypassSecurityTrustHtml(svgWebsite);
      case 'app':
        return this.sanitizer.bypassSecurityTrustHtml(svgApps);
      case 'design':
        return this.sanitizer.bypassSecurityTrustHtml(svgDesign);
      case 'backend':
        return this.sanitizer.bypassSecurityTrustHtml(svgBackend);

      default:
        throw new Error('Icon-Template is required!');
    }
  }
}
