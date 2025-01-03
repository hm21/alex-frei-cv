import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageViewerComponent } from './modal-image-viewer.component';

describe('ModalImageViewerComponent', () => {
  let component: ModalImageViewerComponent;
  let fixture: ComponentFixture<ModalImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalImageViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
