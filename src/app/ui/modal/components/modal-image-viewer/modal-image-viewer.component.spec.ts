import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalImageViewerComponent } from './modal-image-viewer.component';

describe('ModalImageViewerComponent', () => {
  let component: ModalImageViewerComponent;
  let fixture: ComponentFixture<ModalImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalImageViewerComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalImageViewerComponent);
    fixture.componentRef.setInput('data', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the open-hero class when isHeroActive is true', () => {
    component.isHeroActive.set(true);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.open-hero'));
    expect(element).toBeTruthy();
  });

  it('should not apply the open-hero class when isHeroActive is false', () => {
    component.isHeroActive.set(false);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.open-hero'));
    expect(element).toBeFalsy();
  });
});
