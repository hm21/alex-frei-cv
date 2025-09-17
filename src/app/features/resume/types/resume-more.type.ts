import { ModalImagePreviewData } from 'src/app/ui/modal/utils/modal.interface';
import { ProjectDetails } from '../../portfolio/types/project.type';

/**
 * Type representing the structure of the ResumeMore object.
 * This type is used to provide detailed information such as a label,
 * optional project details, and an optional image preview for modal presentation.
 */
export type ResumeMore = {
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
};
