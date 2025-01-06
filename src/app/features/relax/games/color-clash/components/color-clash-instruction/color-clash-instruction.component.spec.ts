import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashManagerService } from '../../services/color-clash-manager.service';
import { ColorClashInstructionComponent } from './color-clash-instruction.component';

describe('ColorClashInstructionComponent', () => {
  let component: ColorClashInstructionComponent;
  let fixture: ComponentFixture<ColorClashInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashInstructionComponent, SharedTestingModule],
      providers: [ColorClashManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorClashInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
