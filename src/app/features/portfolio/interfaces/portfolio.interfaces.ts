import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ModalPreviewItem } from 'src/app/ui/modal/utils/modal.interface';

/** Interface for project details. */
export interface ProjectDetails {
  logo?: SafeHtml;
  title: string;
  subtitle: string;
  description: string;
  demoUrl?: string;
  website?: UrlListTemplateI[];
  store?: UrlListTemplateI[];
  install?: string;
  technology: {
    frontend?: string[];
    backend?: string[];
    prototype?: string[];
    other?: string[];
  };
  images: ModalPreviewItem[];
  video?: SafeResourceUrl;
}

/** Interface for URL list template items. */
export interface UrlListTemplateI {
  url: string;
  title: string;
  name?: string;
}
