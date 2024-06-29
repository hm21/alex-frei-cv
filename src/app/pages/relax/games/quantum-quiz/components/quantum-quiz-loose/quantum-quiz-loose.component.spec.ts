import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../../utils/quiz-manager.service';
import { QuantumQuizLooseComponent } from './quantum-quiz-loose.component';

describe('QuantumQuizLooseComponent', () => {
  let component: QuantumQuizLooseComponent;
  let fixture: ComponentFixture<QuantumQuizLooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizLooseComponent, SharedTestingModule],
      providers: [QuizManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizLooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
