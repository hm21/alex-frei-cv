import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private functionsUrl = environment.endpoints.analytics;

  private http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  private get anonymId() {
    let id = localStorage.getItem('analytics_id');
    if (!id) {
      id =
        (+new Date()).toString() + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('analytics_id', id);
    }
    return id;
  }

  private post(
    mode: 'websiteVisit' | 'pageVisit' | 'interaction',
    eventName?: string,
    value = 0,
  ) {
    if (isPlatformBrowser(this.platformId)) {
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
