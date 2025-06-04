import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ModalPreviewItem } from 'src/app/ui/modal/utils/modal.interface';
import { ProjectId } from './project-id.type';

/** Interface for project details. */
export type ProjectDetails = {
  id: ProjectId;
  logo?: SafeHtml;
  title: string;
  subtitle: string;
  description: string;
  websiteUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  website?: UrlListTemplateI[];
  store?: UrlListTemplateI[];
  install?: string;
  technology: {
    highlight?: string[];
    frontend?: string[];
    backend?: string[];
    prototype?: string[];
    other?: string[];
  };
  thumbnailPath?: string;
  images: ModalPreviewItem[];
  video?: SafeResourceUrl;
  gitStats?: {
    /**
     * The repository name which is required to read the github statistics
     */
    repoName: string;
  };
};

/** Interface for URL list template items. */
export interface UrlListTemplateI {
  url: string;
  title: string;
  name?: string;
}
