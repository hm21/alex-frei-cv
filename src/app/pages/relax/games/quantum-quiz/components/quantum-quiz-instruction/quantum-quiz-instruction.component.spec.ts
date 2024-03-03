import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizInstructionComponent } from './quantum-quiz-instruction.component';

describe('QuantumQuizInstructionComponent', () => {
  let component: QuantumQuizInstructionComponent;
  let fixture: ComponentFixture<QuantumQuizInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizInstructionComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
