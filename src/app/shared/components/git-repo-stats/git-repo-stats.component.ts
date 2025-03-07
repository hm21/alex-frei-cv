import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, input } from '@angular/core';
import { GitRepositoryStatistics } from 'src/app/core/services/git-manager/interfaces/git-repo-stats.interface';
import { TooltipDirective } from 'src/app/ui/tooltip/directives/tooltip.directive';
import svgFork from 'src/assets/img/icon/git-forks.svg';
import svgStar from 'src/assets/img/icon/star.svg';
import { SafePipe } from '../../pipes/safe.pipe';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Component({
  selector: 'af-git-repo-stats',
  imports: [SafePipe, TooltipDirective, ProgressSpinnerComponent],
  templateUrl: './git-repo-stats.component.html',
  styleUrl: './git-repo-stats.component.scss',
  animations: [
    trigger('iconAnimation', [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('{{duration}} ease', style({ opacity: '*' })),
        ],
        { params: { duration: '300ms' } },
      ),
    ]),
  ],
  host: {
    class: 'git-repo-stats',
  },
})
export class GitRepoStatsComponent {
  public gitStats = input.required<GitRepositoryStatistics | undefined>();

  /**
   * A computed property that returns an array of objects representing
   * statistics for a Git repository, such as stars and forks.
   * Each object contains the following properties:
   * - `class`: A string representing the CSS class for the item.
   * - `tooltip`: A localized string for the tooltip text.
   * - `icon`: An SVG icon representing the item.
   * - `value`: The value of the statistic, retrieved from the Git repository stats.
   *
   * @returns An array of objects with repository statistics.
   */
  protected items = computed(() => {
    return [
      {
        class: 'stars',
        tooltip: $localize`Stars`,
        icon: svgStar,
        value: this.gitStats()?.stargazers_count,
      },
      {
        class: 'forks',
        tooltip: $localize`Forks`,
        icon: svgFork,
        value: this.gitStats()?.forks_count,
      },
    ];
  });
}
