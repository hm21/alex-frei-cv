import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { NgxCountAnimationDirective } from 'ngx-count-animation';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { filter } from 'rxjs';
import { FUN_FACTS } from 'src/app/configs/fun-facts';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';
import { GitManagerService } from 'src/app/services/git-manager/git-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-facts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgxScrollAnimationsDirective,
    NgxCountAnimationDirective,
    CardEffectsDirective,
  ],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent extends ExtendedComponent implements OnInit {
  /** Array of facts with their titles, values, and icons. */
  public items = signal(FUN_FACTS);

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

        const i = this.items().findIndex((el) => el.id === 'git-commits');
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
