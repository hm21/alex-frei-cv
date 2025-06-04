import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { ThumbnailBase64Directive } from './thumbnail-base64.directive';

@Component({
  imports: [ThumbnailBase64Directive],
  template: `
    <picture [afThumbnailBase64]="base64">
      <img src="https://picsum.photos/200" alt="" />
    </picture>
  `,
})
class TestComponent {
  base64 = 'url("data:image/png;base64,someFakeBase64")';
}

@Component({
  imports: [ThumbnailBase64Directive],
  template: `<div afThumbnailBase64="fake"></div>`,
})
class InvalidHostComponent {}

describe('ThumbnailBase64Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let pictureEl: DebugElement;
  let imgEl: HTMLImageElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    pictureEl = fixture.debugElement.query(By.css('picture'));
    imgEl = pictureEl.nativeElement.querySelector('img');
  });

  it('should throw if host is not a <picture> element', () => {
    expect(() => {
      const invalidFixture = TestBed.createComponent(InvalidHostComponent);
      invalidFixture.detectChanges();
    }).toThrowError();
  });

  it('should throw if <img> is missing inside <picture>', () => {
    const invalidFixture = TestBed.createComponent(TestComponent);
    const elRef = invalidFixture.nativeElement as HTMLElement;
    elRef.getElementsByTagName('img').item(0)?.remove();

    expect(() => {
      invalidFixture.detectChanges();
    }).toThrowError();
  });

  it('should apply initial styles to <picture>', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    pictureEl = fixture.debugElement.query(By.css('picture'));
    imgEl = pictureEl.nativeElement.querySelector('img');

    const pictureStyle = pictureEl.nativeElement.style;
    expect(pictureStyle.display).toContain('block');
    expect(pictureStyle.width).toContain('100%');
    expect(pictureStyle.height).toContain('100%');
    expect(pictureStyle.backgroundRepeat).toContain('no-repeat');
    expect(pictureStyle.backgroundSize).toContain('cover');
    expect(pictureStyle.backgroundPosition).toContain('center');
    expect(pictureStyle.backgroundImage).toContain('base64');
  });

  it('should handle uncached image load and remove background after fade-in', async () => {
    // Simulate image load event
    const loadEvent = new Event('load');
    imgEl.dispatchEvent(loadEvent);
    await sleep(400); // 300ms fade + 100ms buffer

    fixture.detectChanges();

    const style = pictureEl.nativeElement.style;
    expect(style.backgroundImage).toBe('');
    expect(style.backgroundSize).toBe('');
    expect(style.backgroundPosition).toBe('');
    expect(style.backgroundRepeat).toBe('');
    expect(imgEl.style.opacity).toBe('1');
  });
});
