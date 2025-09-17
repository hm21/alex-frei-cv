import { GitRepositoryStatistics } from 'src/app/core/services/git-manager/types/git-repo-stats.type';
import { ResumeMore } from './resume-more.type';

/**
 * Represents an item in the resume timeline.
 */
export interface ResumeTimelineItem {
  /**
   * The date of the timeline item.
   */
  date: string;

  /**
   * The end date of the timeline item (optional).
   */
  endDate?: Date;

  /**
   * The title of the timeline item.
   */
  title: string;

  /**
   * Additional message for the timeline item (optional).
   */
  msg?: string;

  /**
   * The resume more data for the timeline item.
   */
  more?: ResumeMore;

  /**
   * Indicates whether Git statistics are enabled for the timeline item.
   */
  enableGitStats?: boolean;

  /**
   * Indicates the github statistics
   */
  gitStats?: GitRepositoryStatistics;

  /**
   * The repository name which is required to read the github statistics
   */
  repoName?: string;
}
