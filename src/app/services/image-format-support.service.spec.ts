import { TestBed } from '@angular/core/testing';

import { ImageFormatSupportService } from './image-format-support.service';

describe('ImageFormatSupportService', () => {
  let service: ImageFormatSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFormatSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
