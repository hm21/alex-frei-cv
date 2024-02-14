import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter, map, takeUntil, timer } from 'rxjs';
import { getCookie, setCookie } from '../utils/cookies/cookie-utils';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  public showCookies = false;
  public showAlert = true;

  public marketing = true;
  public analytics = true;

  public waitAccepted = new Subject();

  public destroy$ = new Subject();

  constructor(private router: Router) {}

  public init() {
    this.showCookies = getCookie('cookie_consent_status') != 'true';
    if (this.showCookies) {
      this.router.events
        .pipe(
          takeUntil(this.destroy$),
          filter((event) => event instanceof NavigationStart),
          map((ev: any) => (ev.url as string).includes('privacy'))
        )
        .subscribe((isPrivacyPage: any) => {
          const cookiesAccepted = getCookie('cookie_consent_status') == 'true';
          this.showCookies = !isPrivacyPage && !cookiesAccepted;
          if (!isPrivacyPage && cookiesAccepted) {
            this.destroy$.next(null);
            this.destroy$.complete();
          }
        });
    }
  }

  public save(mode: 'all' | 'selected' | 'decline') {
    const cookies = `{"analytics": "${
      mode == 'all' || (this.analytics && mode === 'selected')
        ? 'true'
        : 'false'
    }", "marketing": "${
      mode == 'all' || (this.marketing && mode === 'selected')
        ? 'true'
        : 'false'
    }"}`;

    setCookie('cookie_consent_status', 'true', 365);
    setCookie('cookie_detail_status', cookies, 365);

    this.showAlert = false;
    this.waitAccepted.next(true);
    this.waitAccepted.complete();
    timer(400).subscribe(() => {
      this.showCookies = false;
    });
  }

  public reopen() {
    this.showAlert = true;
    this.showCookies = true;
  }
}
