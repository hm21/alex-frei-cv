import { Injectable, inject } from '@angular/core';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class GitManagerService {
  private githubUrl = 'https://api.github.com';
  private gitCommitCount = 0;

  private isBrowser = inject(IS_BROWSER);

  private async httpGet(theUrl: string, return_headers?: any) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', theUrl, false); // false for synchronous request
    xmlHttp.send(null);

    if (return_headers) {
      return xmlHttp;
    }
    return xmlHttp.responseText;
  }
  private async getFirstCommit(owner: string, repo: string) {
    const url = this.githubUrl + '/repos/' + owner + '/' + repo + '/commits';
    const req = (await this.httpGet(url, true)) as any;
    let first_commit_hash = '';
    if (req.getResponseHeader('Link')) {
      const page_url = req
        .getResponseHeader('Link')
        .split(',')[1]
        .split(';')[0]
        .split('<')[1]
        .split('>')[0];
      const req_last_commit = await this.httpGet(page_url);
      const first_commit = JSON.parse(req_last_commit as any);
      first_commit_hash = first_commit[first_commit.length - 1]['sha'];
    } else {
      const first_commit = JSON.parse((req as any)!.responseText as any);
      first_commit_hash = first_commit[first_commit.length - 1]['sha'];
    }
    return first_commit_hash;
  }

  public async getCommitCount() {
    if (!this.isBrowser) return;
    if (this.gitCommitCount) return this.gitCommitCount;

    const owner = 'hm21';
    const repo = 'alex-frei-cv';
    const sha = 'master';

    const firstCommit = await this.getFirstCommit(owner, repo);
    const compareUrl =
      this.githubUrl +
      '/repos/' +
      owner +
      '/' +
      repo +
      '/compare/' +
      firstCommit +
      '...' +
      sha;
    const commitReq = await this.httpGet(compareUrl);
    this.gitCommitCount = JSON.parse(commitReq as any)['total_commits'] + 1;

    return this.gitCommitCount;
  }
}
