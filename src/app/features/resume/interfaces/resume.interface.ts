import { GitRepositoryStatistics } from 'src/app/core/services/git-manager/interfaces/git-repo-stats.interface';
import { ModalImagePreviewData } from 'src/app/ui/modal/utils/modal.interface';
import { ProjectDetails } from '../../portfolio/interfaces/portfolio.interfaces';

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

/**
 * Interface representing the structure of the ResumeMore object.
 * This interface is used to provide detailed information such as a label,
 * optional project details, and an optional image preview for modal presentation.
 */
export interface ResumeMore {
  /**
   * A descriptive label for the resume section or project.
   * Example: "Mobile App Development"
   */
  label: string;

  /**
   * Optional details related to a specific project.
   * This can include information such as project description, links, or metadata.
   */
  projectDetails?: ProjectDetails;

  /**
   * Optional data for displaying an image preview in a modal.
   * This could include the image URL, alt text, and other relevant preview information.
   */
  imagePreview?: ModalImagePreviewData;
}

/**
 * Represents a skill item.
 */
export interface SkillItem {
  /**
   * The name of the skill.
   */
  name: string;

  /**
   * The skill level (a number representing the proficiency).
   */
  skillLevel: number;
}
