import { isDevMode } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const metaGenerator = (
  data: MetaDataI & { titleC: Title; metaC: Meta }
) => {
  if (isDevMode()) {
    if (data.title.length < 15 || data.title.length > 64) {
      console.warn(
        `HTML title is too long or too short. The title should have a length between 15 and 64 Characters (Currently ${data.title.length})`
      );
    }
    if (data.description.length < 25 || data.description.length > 160) {
      console.warn(
        `HTML data.description is too long or too short. The data.description should have a length between 25 and 160 Characters (Currently ${data.description.length})`
      );
    }
  }

  /* TODO: set new picture */
  const url = data.img
    ? `https://snaptab.ch/assets/img/social/${data.img || 'og-default.jpg'}`
    : 'https://firebasestorage.googleapis.com/v0/b/ch-waio-snaptab-utils/o/website%2Fog-default.jpg?alt=media&token=92f3f84d-1e57-4a73-8a2a-adc0aa774712';
  data.titleC.setTitle(data.title);
  data.metaC.updateTag({ name: `data.description`, content: data.description });

  /* Facebook */
  data.metaC.updateTag({ property: `og:title`, content: data.title });
  data.metaC.updateTag({
    property: `og:data.description`,
    content: data.description,
  });
  data.metaC.updateTag({ property: `og:image`, content: url });
  data.metaC.updateTag({ property: `og:image:secure_url`, content: url });

  /* Twitter */
  data.metaC.updateTag({ name: `twitter:title`, content: data.title });
  data.metaC.updateTag({
    name: `twitter:data.description`,
    content: data.description,
  });
  data.metaC.updateTag({ name: `twitter:image`, content: url });
};

export interface MetaDataI {
  title: string;
  description: string;
  img?: string;
}
