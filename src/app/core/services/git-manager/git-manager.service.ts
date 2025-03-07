import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/providers/endpoints/endpoints.provider';
import { IS_BROWSER } from '../../providers/platform.provider';
import { GitRepositoryStatistics } from './interfaces/git-repo-stats.interface';

@Injectable({
  providedIn: 'root',
})
export class GitManagerService {
  private gitCommitCount = 0;
  private gitRepoStats: { [id: string]: GitRepositoryStatistics } = {};

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
      tap((val) => {
        this.gitCommitCount = val;
      }),
    );
  }

  /**
   * Retrieves the statistics for a given Git repository.
   *
   * @param repoName - The name of the repository for which to retrieve statistics.
   * @returns An Observable that emits the statistics of the specified Git repository.
   *
   * If the statistics are already cached or if the code is not running in a browser environment,
   * the cached statistics are returned. Otherwise, a POST request is made to fetch the statistics
   * from the server, and the result is cached for future use.
   */
  public getRepoStats(repoName: string): Observable<GitRepositoryStatistics> {
    if (!this.isBrowser || this.gitRepoStats[repoName]) {
      return of(this.gitRepoStats[repoName]);
    }

    return this.http
      .post<GitRepositoryStatistics>(this.endpoints.gitRepoStats, {
        repoName,
      })
      .pipe(
        tap((val) => {
          this.gitRepoStats[repoName] = val;
        }),
      );
  }
}
