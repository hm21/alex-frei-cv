import { Component, OnInit, inject, signal } from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { filter } from 'rxjs';
import { funFacts } from 'src/app/configs/fun-facts';
import { GitManagerService } from 'src/app/services/git-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-facts',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgxCountAnimationModule],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent extends ExtendedComponent implements OnInit {
  /** Array of facts with their titles, values, and icons. */
  public items = signal(funFacts);

  /** Service for managing Git-related operations. */
  private gitManager = inject(GitManagerService);

  override ngOnInit(): void {
    super.ngOnInit();
    this.getCommitCount();
  }

  /** Retrieves the current Git commit count asynchronously. */
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
          this.items.update((items) => {
            items[i].value = count;
            items[i].loading = false;
            return [...items];
          });
        } else {
          throw new Error('Commit item not found!');
        }
      });
  }
}
