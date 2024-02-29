import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorClashInstructionComponent } from './color-clash-instruction.component';

describe('ColorClashInstructionComponent', () => {
  let component: ColorClashInstructionComponent;
  let fixture: ComponentFixture<ColorClashInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashInstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorClashInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
