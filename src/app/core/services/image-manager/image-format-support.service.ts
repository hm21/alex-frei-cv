import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import { IS_BROWSER } from '../../providers/platform.provider';

@Injectable({
  providedIn: 'root',
})
export class ImageFormatSupportService {
  private isBrowser = inject(IS_BROWSER);

  public formatChecked$ = new BehaviorSubject(false);
  private support = {
    webP: false,
    avif: false,
  };

  constructor() {
    if (this.isBrowser) {
      this.checkImageSupport();
    }
  }

  private async checkImageSupport() {
    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve) => {
      const isAvifSupported = await this.detectImageFormatSupport('avif');
      this.support.avif = isAvifSupported;

      if (isAvifSupported) {
        this.support.webP = true;
      } else {
        const isWebpSupported = await this.detectImageFormatSupport('webp');
        this.support.webP = isWebpSupported;
      }
      resolve(true);
    }).catch(() => console.warn);

    this.formatChecked$.next(true);
  }
  private detectImageFormatSupport(format: TestImageFormats): Promise<boolean> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(true);
      };
      image.onerror = () => {
        resolve(false);
      };
      image.src = `data:image/${format};base64,${this.getTestImageBase64(format)}`;
    });
  }

  private getTestImageBase64(format: TestImageFormats): string {
    // Sample images in base64 to test support
    if (format === 'avif') {
      return 'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    } else if (format === 'webp') {
      return 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    }
    return '';
  }

  public get supportCheck(): Observable<any> {
    return new Observable((subscriber) => {
      this.formatChecked$
        .pipe(
          filter((el) => el),
          take(1),
        )
        .subscribe({
          next() {
            subscriber.next(true);
            subscriber.complete();
          },
          complete() {
            subscriber.complete();
          },
        });
    });
  }

  public get isAvifSupported() {
    return this.support.avif;
  }
  public get isWebpSupported() {
    return this.support.webP;
  }
}

type TestImageFormats = 'webp' | 'avif';
