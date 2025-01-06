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
