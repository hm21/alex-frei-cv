import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorClashComponent } from './color-clash.component';

describe('ColorClashComponent', () => {
  let component: ColorClashComponent;
  let fixture: ComponentFixture<ColorClashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorClashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
