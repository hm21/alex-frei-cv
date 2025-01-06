import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, SafeHtml } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ModalHeaderComponent } from './modal-header.component';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHeaderComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHeaderComponent);
    fixture.componentRef.setInput('title', 'test title');
    fixture.componentRef.setInput('subtitle', 'test sub-title');
    fixture.componentRef.setInput('logo', '<img src="logo.png">' as SafeHtml);
    fixture.componentRef.setInput('modalAnimationDurationOut', 300);
    fixture.componentRef.setInput('enableEscapeButton', true);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and subtitle', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    const subtitleElement = fixture.debugElement.query(By.css('h2'));

    expect(titleElement.nativeElement.textContent).toContain('test title');
    expect(subtitleElement.nativeElement.textContent).toContain('test sub-title');
  });

  it('should emit startCloseModal and endCloseModal on closeModal', (done) => {
    spyOn(component.startCloseModal, 'emit');
    spyOn(component.endCloseModal, 'emit');

    component.closeModal();

    expect(component.startCloseModal.emit).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.endCloseModal.emit).toHaveBeenCalled();
      done();
    }, 300);
  });

  it('should close modal on Escape key press', () => {
    spyOn(component, 'closeModal');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not close modal on non-Escape key press', () => {
    spyOn(component, 'closeModal');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(component.closeModal).not.toHaveBeenCalled();
  });
});
