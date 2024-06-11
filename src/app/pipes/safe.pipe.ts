import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  /** DomSanitizer for bypassing security. */
  private sanitizer = inject(DomSanitizer);

  transform(
    value: any,
    mode: 'html' | 'url' | 'script' | 'style' | 'script' | 'resourceUrl' = 'html',
  ): unknown {
    switch (mode) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unkown mode: ${mode}`);
    }
  }
}
