import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { MetaManagerService } from './meta-manager.service';
import { PageMetaData } from './page-meta-data.interface';

describe('MetaManagerService', () => {
  let service: MetaManagerService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
      providers: [
        MetaManagerService,
        {
          provide: Title,
          useValue: {
            setTitle: jasmine.createSpy('setTitle'),
          },
        },
        {
          provide: Meta,
          useValue: {
            updateTag: jasmine.createSpy('updateTag'),
          },
        },
      ],
    });

    service = TestBed.inject(MetaManagerService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should set the title and meta tags correctly', () => {
    const data: PageMetaData = {
      title: 'Test Title',
      description: 'Test Description',
      img: 'https://example.com/test.jpg',
    };

    service.generate(data);

    expect(titleService.setTitle).toHaveBeenCalledWith(data.title);
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: data.description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: data.title,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: data.description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: data.img!,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      property: 'og:image:secure_url',
      content: data.img!,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:title',
      content: data.title,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:description',
      content: data.description,
    });
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'twitter:image',
      content: data.img!,
    });
  });
});
