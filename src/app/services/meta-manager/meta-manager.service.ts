import { Injectable, inject, isDevMode } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageMetaData } from './page-meta-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MetaManagerService {
  public title = inject(Title);
  public meta = inject(Meta);

  /**
   * The metadata for the active page.
   * This property is optional and can be undefined.
   *
   * @type {PageMetaData|undefined}
   */
  public activeMetaData?: PageMetaData;

  /**
   * Generates meta tags for a webpage based on provided data.
   * @param {MetaDataI} data - The metadata and Angular Title/Meta services.
   */
  public generate(data: PageMetaData) {
    data.img ??=
      'https://firebasestorage.googleapis.com/v0/b/alex-frei/o/alex_og.jpeg?alt=media';

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
    this.activeMetaData = data;

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: `description`, content: data.description });

    /* Facebook */
    this.meta.updateTag({ property: `og:title`, content: data.title });
    this.meta.updateTag({
      property: `og:description`,
      content: data.description,
    });
    this.meta.updateTag({ property: `og:image`, content: data.img });
    this.meta.updateTag({ property: `og:image:secure_url`, content: data.img });

    /* Twitter */
    this.meta.updateTag({ name: `twitter:title`, content: data.title });
    this.meta.updateTag({
      name: `twitter:description`,
      content: data.description,
    });
    this.meta.updateTag({ name: `twitter:image`, content: data.img });
  }
}
