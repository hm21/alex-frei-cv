import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

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
    frontend?: BadgeTemplateI[];
    backend?: BadgeTemplateI[];
    prototype?: BadgeTemplateI[];
    other?: BadgeTemplateI[];
  };
  images: {
    path: string;
    alt: string;
    ratio?: string;
    backgroundColor?: string;
    isGif?: boolean;
  }[];
  video?: SafeResourceUrl;
}

/** Interface for badge template items. */
export interface BadgeTemplateI {
  name: string;
}

/** Interface for URL list template items. */
export interface UrlListTemplateI {
  url: string;
  title: string;
  name?: string;
}
