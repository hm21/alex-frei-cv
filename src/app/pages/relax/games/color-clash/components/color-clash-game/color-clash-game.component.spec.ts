import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorClashGameComponent } from './color-clash-game.component';

describe('ColorClashGameComponent', () => {
  let component: ColorClashGameComponent;
  let fixture: ComponentFixture<ColorClashGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorClashGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
