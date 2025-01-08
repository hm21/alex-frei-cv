import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { TypewriterComponent } from './typewriter.component';

describe('TypewriterComponent', () => {
  let component: TypewriterComponent;
  let fixture: ComponentFixture<TypewriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, TypewriterComponent],
      teardown: { destroyAfterEach: false },
    })
      .overrideComponent(TypewriterComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterComponent);
    fixture.componentRef.setInput('items', ['item1', 'item2']);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input for items', () => {
    expect(component.items()).toEqual(['item1', 'item2']);
  });

  it('should call animateText after view init', () => {
    spyOn(component as any, 'animateText');
    component.ngAfterViewInit();
    expect((component as any).animateText).toHaveBeenCalled();
  });

  it('should set innerHTML correctly during animation', (done) => {
    fixture.componentRef.setInput('items', ['test']);
    component = fixture.componentInstance;
    component.ngAfterViewInit();
    setTimeout(() => {
      expect(component.nativeElement.innerHTML).toContain('t');
      done();
    }, 200);
  });

  it('should check if element is visible', async () => {
    spyOn(component as any, 'isElementVisible').and.callThrough();
    component.ngAfterViewInit();

    /// await interval and timer-speed
    await sleep(200);

    expect((component as any).isElementVisible).toHaveBeenCalled();
  });

  it('should animate text correctly', (done) => {
    fixture.componentRef.setInput('items', ['test']);
    component.ngAfterViewInit();
    setTimeout(() => {
      expect(component.nativeElement.innerHTML).toContain('t');
      done();
    }, 200);
  });

  it('should handle empty items array', () => {
    fixture.componentRef.setInput('items', []);
    component = fixture.componentInstance;
    component.ngAfterViewInit();
    expect(component.items()).toEqual([]);
  });

  it('should add and remove blink class during animation', async () => {
    const fixture = TestBed.createComponent(TypewriterComponent);
    fixture.componentRef.setInput('items', ['test1', 'test2']);

    const cmp = fixture.componentInstance;
    cmp.ngAfterViewInit();

    // sleep 200 for init and 400 for every character (5 in item1)
    await sleep(740);

    expect(cmp.classList.contains('blink')).toBeTrue();

    await sleep(1800);

    expect(cmp.classList.contains('blink')).toBeFalse();
    expect(cmp.nativeElement.innerText).toBe('');
  });
});
