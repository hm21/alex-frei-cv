import { isDevMode } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Generates meta tags for a webpage based on provided data.
 * @param {MetaDataI & { titleC: Title; metaC: Meta }} data - The metadata and Angular Title/Meta services.
 */
export const metaGenerator = (
  data: MetaDataI & { titleC: Title; metaC: Meta },
) => {
  if (isDevMode()) {
    if (data.title.length < 15 || data.title.length > 64) {
      console.warn(
        `HTML title is too long or too short. The title should have a length between 15 and 64 Characters (Currently ${data.title.length})`,
      );
    }
    if (data.description.length < 25 || data.description.length > 160) {
      console.warn(
        `HTML description is too long or too short. The description should have a length between 25 and 160 Characters (Currently ${data.description.length})`,
      );
    }
  }

  
  const url = data.img ?? 'https://alex-frei.web.app/assets/img/avatar/alex_original.png';
  data.titleC.setTitle(data.title);
  data.metaC.updateTag({ name: `description`, content: data.description });

  /* Facebook */
  data.metaC.updateTag({ property: `og:title`, content: data.title });
  data.metaC.updateTag({
    property: `og:description`,
    content: data.description,
  });
  data.metaC.updateTag({ property: `og:image`, content: url });
  data.metaC.updateTag({ property: `og:image:secure_url`, content: url });

  /* Twitter */
  data.metaC.updateTag({ name: `twitter:title`, content: data.title });
  data.metaC.updateTag({
    name: `twitter:description`,
    content: data.description,
  });
  data.metaC.updateTag({ name: `twitter:image`, content: url });
};

/**
 * Interface for defining metadata for a webpage.
 */
export interface MetaDataI {
  title: string;
  description: string;
  img?: string;
}
