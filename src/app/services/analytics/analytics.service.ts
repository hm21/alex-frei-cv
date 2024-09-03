import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IS_BROWSER } from 'src/app/utils/is-browser.provider';
import { IdManagerService } from '../id-manager/id-manager.service';
 
/// This is just an example how to log analytics in the server.
/**
 * Service for managing analytics tracking.
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private isBrowser = inject(IS_BROWSER);
  private idManager = inject(IdManagerService);

  /**
   * Posts analytics data to the server.
   * @param {('websiteVisit' | 'pageVisit' | 'interaction')} mode - The mode of analytics data.
   * @param {string} [eventName] - The name of the event.
   * /
  private post(
    mode: 'websiteVisit' | 'pageVisit' | 'interaction',
    eventName?: string,
    value = 0,
  ) {
    /*if (this.isBrowser) {
      this.http
        .post(environment.endpoints.analytics, {
          mode,
          eventName,
          value,
          anonymId: this.idManager.userId,
        })
        .subscribe(); 
    }* /
  }

  /**
   * Tracks a website visit.
   * /
  public websiteVisit() {
    this.post('websiteVisit', 'visit');
  }

  /**
   * Tracks a page visit.
   * @param {string} pageName - The name of the visited page.
   * /
  public pageVisit(pageName: string) {
    this.post('pageVisit', pageName);
  }

  /**
   * Tracks an interaction event.
   * @param {string} eventName - The name of the interaction event.
   * /
  public interaction(eventName: string) {
    this.post('interaction', eventName);
  }*/
}
