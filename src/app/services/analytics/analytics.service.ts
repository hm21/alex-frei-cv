import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';

/**
 * Service for managing analytics tracking.
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private functionsUrl = ''; // environment.endpoints.analytics;

  private http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  /**
   * Generates an anonymous ID for tracking.
   * @returns {string} The generated anonymous ID.
   */
  private get anonymId(): string {
    let id = localStorage.getItem('analytics_id');
    if (!id) {
      id =
        (+new Date()).toString() + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('analytics_id', id);
    }
    return id;
  }

  /**
   * Posts analytics data to the server.
   * @param {('websiteVisit' | 'pageVisit' | 'interaction')} mode - The mode of analytics data.
   * @param {string} [eventName] - The name of the event.
   */
  private post(
    mode: 'websiteVisit' | 'pageVisit' | 'interaction',
    eventName?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value = 0,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      /** TODO: Post optional analytics */
      /* this.http
        .post(this.functionsUrl, {
          mode,
          eventName,
          value,
          anonymId: this.anonymId,
        })
        .subscribe(); */
    }
  }

  /**
   * Tracks a website visit.
   */
  public websiteVisit() {
    this.post('websiteVisit', 'visit');
  }

  /**
   * Tracks a page visit.
   * @param {string} pageName - The name of the visited page.
   */
  public pageVisit(pageName: string) {
    this.post('pageVisit', pageName);
  }

  /**
   * Tracks an interaction event.
   * @param {string} eventName - The name of the interaction event.
   */
  public interaction(eventName: string) {
    this.post('interaction', eventName);
  }
}
