import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizGameComponent } from './quantum-quiz-game.component';

describe('QuantumQuizGameComponent', () => {
  let component: QuantumQuizGameComponent;
  let fixture: ComponentFixture<QuantumQuizGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizGameComponent, SharedTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantumQuizGameComponent);
    component = fixture.componentInstance;
    component.quiz = [
      {
        question: 'Test Question',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select option A', () => {
    spyOn(component, 'correctAnswerLetter').and.returnValue('A');
    spyOn(component, 'nextQuestion');

    fixture.detectChanges(); 

    const buttonA = fixture.componentInstance.answerRefA.nativeElement;
    expect(buttonA).toBeTruthy(); 
    buttonA.click(); 

    expect(component.state()).toEqual('correct');
  });

  it('should advance to the next page', () => {
    spyOn(component, 'nextPage');
    spyOn(component, 'correctAnswerLetter').and.returnValue('A');

    component.level.set(14);
    component.selectOption('A');

    expect(component.nextPage).toHaveBeenCalled();
  });
});
