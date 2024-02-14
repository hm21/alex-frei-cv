import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getCookie, setCookie } from '../../utils/cookies/cookie-utils';
import { CookieService } from '../cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private functionsUrl = 'https://snaptab.ch/api/v1/analytics'; // TODO:

  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  private get anonymId() {
    if (!getCookie('analytics_id')) {
      setCookie(
        'analytics_id',
        (+new Date()).toString() + Math.random().toString(36).substring(2, 11),
        1
      );
    }
    return getCookie('analytics_id');
  }

  private post(
    mode: 'websiteVisit' | 'pageVisit' | 'interaction',
    eventName?: string,
    value = 0
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.cookies.showAlert) {
        this.cookies.waitAccepted.subscribe(() => {
          this.post(mode, eventName, value);
        });
      } else {
        if (
          environment.analytics &&
          JSON.parse(getCookie('cookie_detail_status') ?? '{}')?.analytics ==
            'true'
        ) {
          this.http
            .post(this.functionsUrl, {
              mode,
              eventName,
              value,
              anonymId: this.anonymId,
            })
            .subscribe();
        }
      }
    }
  }
  public websiteVisit() {
    this.post('websiteVisit', 'visit');
  }
  public pageVisit(pageName: string) {
    this.post('pageVisit', pageName);
  }
  public interaction(eventName: string) {
    this.post('interaction', eventName);
  }
}
