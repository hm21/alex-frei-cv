import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreviewItem } from 'src/app/ui/modal/utils/modal.interface';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ImageVideoChooserComponent } from './image-video-chooser.component';

describe('ImageVideoChooserComponent', () => {
  let component: ImageVideoChooserComponent;
  let fixture: ComponentFixture<ImageVideoChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageVideoChooserComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageVideoChooserComponent);
    const item: ModalPreviewItem = {
      path: 'test_image-path',
      alt: 'Test Image',
    };
    fixture.componentRef.setInput('item', item);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display video when item is a video', () => {
    const item: ModalPreviewItem = {
      isVideo: true,
      path: 'test_video-path.mp4',
      alt: 'Test',
      ratio: '16 / 9',
    };
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    component = fixture.componentInstance;

    const videoElement: HTMLVideoElement =
      fixture.nativeElement.querySelector('video');
    expect(videoElement).toBeTruthy();
    expect(videoElement.src).toContain('test_video-path.mp4');
    expect(videoElement.style.aspectRatio).toBe('16 / 9');
  });

  it('should display image when item is not a video', async () => {
    const path = 'test_path';
    const alt = 'Test Image';
    const backgroundColor = 'blue';
    const ratio = '4 / 3';

    const item: ModalPreviewItem = {
      isVideo: false,
      path,
      ratio,
      backgroundColor,
      alt,
    };
    fixture.componentRef.setInput('item', item);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const pictureElement: HTMLElement =
      fixture.nativeElement.querySelector('picture');
    /// Select the second image cuz the first one is the skeleton loader
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelectorAll('img')[1];

    expect(pictureElement).toBeTruthy();
    expect(pictureElement.style.backgroundColor).toBe(backgroundColor);
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(path);
    expect(imgElement.alt).toBe(alt);
    expect(imgElement.style.aspectRatio).toContain(ratio);
  });

  it('should emit openHero event when openHero is triggered', () => {
    spyOn(component.openHero, 'emit');
    const item: ModalPreviewItem = {
      isVideo: false,
      path: 'image-path',
      alt: 'Test Image',
    };
    fixture.componentRef.setInput('item', item);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelectorAll('img')[1];
    imgElement.dispatchEvent(new Event('openHero'));
    fixture.detectChanges();

    expect(component.openHero.emit).toHaveBeenCalled();
  });

  it('should emit closeHero event when closeHero is triggered', () => {
    spyOn(component.closeHero, 'emit');
    const item: ModalPreviewItem = {
      isVideo: false,
      path: 'image-path',
      alt: 'Test Image',
    };
    fixture.componentRef.setInput('item', item);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelectorAll('img')[1];
    imgElement.dispatchEvent(new Event('closeHero'));
    fixture.detectChanges();

    expect(component.closeHero.emit).toHaveBeenCalled();
  });
});
