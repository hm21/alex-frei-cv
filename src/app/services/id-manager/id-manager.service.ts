import { Injectable, inject } from '@angular/core';
import { IS_BROWSER } from 'src/app/utils/providers/platform.provider';

@Injectable({
  providedIn: 'root',
})
export class IdManagerService {
  public readonly userId: string;
  public readonly sessionId: string;

  private isBrowser = inject(IS_BROWSER);
  constructor() {
    this.sessionId = this.generateUniqueId();

    if (this.isBrowser) {
      let localUserId = localStorage.getItem('userId');
      if (!localUserId) {
        localUserId = this.generateUniqueId();
        localStorage.setItem('userId', localUserId);
      }
      this.userId = localUserId;
    } else {
      this.userId = 'SERVER';
    }
  }

  public generateUniqueId() {
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const timestamp: string = Math.floor(Date.now() / 1000)
      .toString(36)
      .padStart(8, '0');

    let randomPart: string = '';
    for (let i = 0; i < 20; i++) {
      randomPart += characters[Math.randomNextInt(characters.length)];
    }

    return `${timestamp}${randomPart}`;
  }
}
