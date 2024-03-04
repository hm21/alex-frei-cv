import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { filter } from 'rxjs';
import { GitManagerService } from 'src/app/services/git-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-facts',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgxCountAnimationModule],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  private items = signal([
    {
      title: $localize`Coffee Consumed`,
      value: 21,
      icon: 'coffee',
    },
    {
      title: $localize`Walking Breaks`,
      value: 11,
      icon: 'walking',
    },
    {
      title: $localize`Listen Songs`,
      value: 425,
      icon: 'music',
    },
    {
      title: $localize`Git Commits`,
      value: 0,
      icon: 'git',
    },
  ]);

  private gitManager = inject(GitManagerService);

  override ngOnInit(): void {
    this.getCommitCount();
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  private createItems() {
    this.items().forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }

  private async getCommitCount() {
    this.gitManager
      .getCommitCount()
      .pipe(
        this.destroyPipe(),
        filter((count) => !!count),
      )
      .subscribe((count) => {
        if (!count) return;

        const i = this.items().findIndex((el) => el.icon === 'git');
        if (i >= 0) {
          this.items()[i].value = count;
        } else {
          throw new Error('Commit item not found!');
        }

        this.cdRef.detectChanges();
      });
  }
}
