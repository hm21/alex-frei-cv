import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageFormatSupportService {
  private checkedFormats: { [format: string]: boolean } = {};

  private supportsFormat(format: string): Promise<boolean> | boolean {
    if (this.checkedFormats[format] != null) return this.checkedFormats[format];

    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        this.checkedFormats[format] = true;
        resolve(true);
      };
      image.onerror = () => {
        this.checkedFormats[format] = false;
        resolve(false);
      };
      image.src = `data:image/${format};base64,${this.getTestImageBase64(format)}`;
    });
  }

  private getTestImageBase64(format: string): string {
    // Sample images in base64 to test support
    if (format === 'avif') {
      return 'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    } else if (format === 'webp') {
      return 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    }
    return '';
  }

  public async isAvifSupported(): Promise<boolean> {
    return this.supportsFormat('avif');
  }

  public async isWebpSupported(): Promise<boolean> {
    return this.supportsFormat('webp');
  }
}
