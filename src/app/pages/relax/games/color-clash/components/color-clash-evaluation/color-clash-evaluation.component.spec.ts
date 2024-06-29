import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashManagerService } from '../../utils/color-clash-manager.service';
import { ColorClashEvaluationComponent } from './color-clash-evaluation.component';

describe('ColorClashEvaluationComponent', () => {
  let component: ColorClashEvaluationComponent;
  let fixture: ComponentFixture<ColorClashEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashEvaluationComponent, SharedTestingModule],
      providers: [ColorClashManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorClashEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
