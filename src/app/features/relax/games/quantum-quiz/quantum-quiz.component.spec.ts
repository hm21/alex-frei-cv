import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { runPageMetaTests } from 'src/test/utils/page-meta-test.helper';
import { QuantumQuizComponent } from './quantum-quiz.component';
import { QuizManagerService } from './services/quiz-manager.service';

describe('QuantumQuizComponent', () => {
  let component: QuantumQuizComponent;
  let fixture: ComponentFixture<QuantumQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizComponent, SharedTestingModule],
      providers: [QuizManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runPageMetaTests(() => component);
});
