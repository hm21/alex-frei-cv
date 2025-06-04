import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { WINDOW } from '../../providers/window.provider';
import { LoggerService } from '../logger/logger.service';
import { ImageFormatSupportService } from './image-format-support.service';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  private imageFormatSupport = inject(ImageFormatSupportService);
  private logger = inject(LoggerService);
  private window = inject(WINDOW);

  private imageFormat = 'jpeg';
  private readonly enableLogs = false;

  /**
   * Retrieves the preferred image format, such as 'avif' if supported.
   */
  public get preferredImageFormat() {
    return this.imageFormat;
  }

  /**
   * Gets the device pixel ratio, ensuring it is between 1 and 4.
   * @returns {number} The device pixel ratio.
   */
  private get devicePixelRatio(): number {
    return Math.min(4, Math.max(1, this.window.devicePixelRatio.ceil()));
  }

  /**
   * Preloads image URLs.
   * @param {string[]} urls - The URLs of the images to preload.
   * @param {boolean} [ignoreCheckImageFormat=false] - Whether to ignore checking the best supported image format.
   */
  public async preloadUrls(
    urls: string[],
    ignoreCheckImageFormat: boolean = false,
  ) {
    if (!ignoreCheckImageFormat) await this.checkBestSupportedImageFormat();

    urls = urls.map((url) => `${url}.${this.imageFormat}`);

    this.preloadImages(urls);
  }

  /**
   * Checks and sets the best supported image format.
   */
  private async checkBestSupportedImageFormat() {
    await firstValueFrom(this.imageFormatSupport.supportCheck);
    if (this.imageFormatSupport.isAvifSupported) {
      this.imageFormat = 'avif';
    } else if (this.imageFormatSupport.isWebpSupported) {
      this.imageFormat = 'webp';
    }
  }

  /**
   * Preloads a list of image URLs by creating `Image` instances for each and waiting for them to load.
   * If all images load successfully, the promise resolves. If any image fails to load, the promise rejects.
   * This function does not rely on the service worker to cache the images.
   *
   * @param {string[]} urls - Array of image URLs to be preloaded.
   * @returns {Promise<void>} A promise that resolves when all images are successfully loaded, or rejects if any fail to load.
   */
  public preloadImages(urls: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const promises = urls.map((url) => {
        return new Promise((res, rej) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            this.log(`Image loaded: ${img.src}`);
            res(null);
          };
          img.onerror = (err) => {
            this.log(`Failed to load image: ${img.src}`, { error: true });
            rej(err);
          };
        });
      });

      Promise.all(promises)
        .then(() => {
          this.log('All images preloaded without service worker');
          resolve();
        })
        .catch((err) => {
          this.log('Error preloading images', { error: true });
          reject(err);
        });
    });
  }

  /**
   * Logs a message if logging is enabled.
   * @param {string} msg - The message to log.
   * @param {Object} [options] - Optional settings for the log message.
   * @param {boolean} [options.error=false] - Whether the log message is an error.
   */
  private log(msg: string, options?: { error?: boolean }) {
    if (!this.enableLogs) return;

    if (options?.error) {
      this.logger.error(msg).print();
    } else {
      this.logger.log(msg).print();
    }
  }
}
