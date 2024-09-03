import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ENDPOINTS } from 'src/app/utils/providers/endpoints/endpoints.provider';
import { IS_BROWSER } from '../../utils/providers/is-browser.provider';

@Injectable({
  providedIn: 'root',
})
export class GitManagerService {
  private gitCommitCount = 0;

  private endpoints = inject(ENDPOINTS);
  private isBrowser = inject(IS_BROWSER);
  private http = inject(HttpClient);

  /**
   * Retrieves the number of commits from the GitHub repository.
   * @returns {Observable<number>} An observable emitting the number of commits.
   */
  public getCommitCount(): Observable<number> {
    if (!this.isBrowser || this.gitCommitCount) {
      return of(this.gitCommitCount);
    }

    return this.http.get<number>(this.endpoints.gitCommitCount).pipe(
      tap(val=>{
        this.gitCommitCount = val;
      })
    );
  }
}
