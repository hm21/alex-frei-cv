import { Injectable, inject, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { CONTACT_OPTIONS } from '../configs/contact-options';
import { GAMES } from '../configs/games';
import { ImageFormatSupportService } from './image-format-support.service';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  private serviceWorker = inject(SwUpdate);
  private imageFormatSupport = inject(ImageFormatSupportService);

  private imageFormat = 'jpeg';
  private readonly enableLogs = false;

  /** Preload images which are global required */
  public async startPreloadGlobalImages() {
    await this.checkBestSupportedImageFormat();

    const urls = [];

    for (const item of GAMES) {
      urls.push(
        `assets/img/game/${item.id}/${item.id}_${window.devicePixelRatio.ceil()}x`,
      );
    }
    for (const item of CONTACT_OPTIONS) {
      urls.push(
        `assets/img/contact/${item.id}/${item.id}_${window.devicePixelRatio.ceil()}x`,
      );
    }

    this.preloadUrls(urls, true);
  }

  /** Preload image urls */
  public async preloadUrls(urls: string[], ignoreCheckImageFormat = false) {
    if (!ignoreCheckImageFormat) await this.checkBestSupportedImageFormat();

    urls = urls.map((url) => `${url}.${this.imageFormat}`);

    if (this.serviceWorker.isEnabled) {
      this.log('Service worker is active, using cache');
      this.preloadImagesWithServiceWorker(urls).catch((err) => {
        this.log(
          'Failed to preload images with service worker, fallback to image objects',
          { error: true },
        );
        this.preloadImagesWithoutServiceWorker(urls);
      });
    } else {
      this.log('Service worker not supported, using image objects');
      this.preloadImagesWithoutServiceWorker(urls);
    }
  }

  private async checkBestSupportedImageFormat() {
    if (await this.imageFormatSupport.isAvifSupported()) {
      this.imageFormat = 'avif';
    } else if (await this.imageFormatSupport.isWebpSupported()) {
      this.imageFormat = 'webp';
    }
  }

  private async preloadImagesWithServiceWorker(urls: string[]) {
    const cache = await caches.open('my-cache');
    const promises = urls.map(async (url) => {
      this.log(`Caching: ${url}`);

      return await cache.add(url).catch(() => {
        this.log(`Failed to cache ${url}`, { error: true });
      });
    });

    await Promise.all(promises).catch(() => {
      this.log('Error opening cache', { error: true });
    });
    this.log('All images preloaded with service worker');
  }

  private preloadImagesWithoutServiceWorker(urls: string[]) {
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
          resolve(null);
        })
        .catch((err) => {
          this.log('Error preloading images', { error: true });
          reject(err);
        });
    });
  }

  private log(msg: string, options?: { error?: boolean }) {
    if (!isDevMode() || !this.enableLogs) return;
    if (options?.error) {
      console.error(msg);
    } else {
      console.log(msg);
    }
  }
}
