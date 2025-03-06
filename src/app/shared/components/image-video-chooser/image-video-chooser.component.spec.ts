import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVideoChooserComponent } from './image-video-chooser.component';

describe('ImageVideoChooserComponent', () => {
  let component: ImageVideoChooserComponent;
  let fixture: ComponentFixture<ImageVideoChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageVideoChooserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageVideoChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
