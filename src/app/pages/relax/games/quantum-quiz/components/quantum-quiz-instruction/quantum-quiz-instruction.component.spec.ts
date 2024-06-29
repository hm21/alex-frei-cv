import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../../utils/quiz-manager.service';
import { QuantumQuizInstructionComponent } from './quantum-quiz-instruction.component';

describe('QuantumQuizInstructionComponent', () => {
  let component: QuantumQuizInstructionComponent;
  let fixture: ComponentFixture<QuantumQuizInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizInstructionComponent, SharedTestingModule],
      providers: [QuizManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
