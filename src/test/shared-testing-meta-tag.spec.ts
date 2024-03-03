// test-utils.ts

import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { metaGenerator } from 'src/app/utils/meta-generator';

export function testMetaGenerator() {
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should set title and meta tags correctly', () => {
    const titleTxt = 'Lorem ipsum dolor sit amet, co';
    const description = 'Lorem ipsum dolor sit amet, co';
    const img = 'test-image.jpg';

    spyOn(titleService, 'setTitle');
    spyOn(metaService, 'updateTag');

    metaGenerator({
      title: titleTxt,
      metaC: metaService,
      titleC: titleService,
      description,
      img,
    });

    expect(titleService.setTitle).toHaveBeenCalledWith(titleTxt);
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: titleTxt,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: `https://alex-frei.web.app/assets/img/social/${img}`,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:image:secure_url',
      content: `https://alex-frei.web.app/assets/img/social/${img}`,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:title',
      content: titleTxt,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:description',
      content: description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:image',
      content: `https://alex-frei.web.app/assets/img/social/${img}`,
    });
  });
}
