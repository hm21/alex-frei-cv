import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-facts',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgxCountAnimationModule],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent extends ExtendedComponent implements OnInit {
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  public items = [
    {
      title: $localize`Coffee Consumed`,
      value: 6,
      icon: 'coffee',
    },
    {
      title: $localize`Walking Breaks`,
      value: 1,
      icon: 'walking',
    },
    {
      title: $localize`Listen Songs`,
      value: 425,
      icon: 'music',
    },
    {
      title: $localize`Git Commits`,
      value: 1,
      icon: 'git',
    },
  ];

  private githubUrl = 'https://api.github.com';

  override ngOnInit(): void {
    this.getCommitCount();
    this.createItems();

    super.ngOnInit();
  }

  private createItems() {
    this.items.forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }

  private async httpGet(theUrl: string, return_headers?: any) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', theUrl, false); // false for synchronous request
    xmlHttp.send(null);

    if (return_headers) {
      return xmlHttp;
    }
    return xmlHttp.responseText;
  }
  private async get_first_commit(owner: string, repo: string) {
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

  private async getCommitCount() {
    if (!this.isBrowser) return;
    const owner = 'hm21';
    const repo = 'alex-frei-cv';
    const sha = 'master';

    const first_commit = await this.get_first_commit(owner, repo);
    const compare_url =
      this.githubUrl +
      '/repos/' +
      owner +
      '/' +
      repo +
      '/compare/' +
      first_commit +
      '...' +
      sha;
    const commit_req = await this.httpGet(compare_url);
    const commit_count = JSON.parse(commit_req as any)['total_commits'] + 1;

    const i = this.items.findIndex((el) => el.icon === 'git');
    if (i >= 0) {
      this.items[i].value = commit_count;
    } else {
      throw new Error('Commit item not found!');
    }
  }
}
