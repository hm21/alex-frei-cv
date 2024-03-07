import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class GitManagerService {
  private githubUrl = 'https://api.github.com';
  private gitCommitCount = 0;

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

    const url = `${this.githubUrl}/repos/hm21/alex-frei-cv/commits`;
    return this.http.get<any[]>(url).pipe(map((el) => el.length));
  }
}
