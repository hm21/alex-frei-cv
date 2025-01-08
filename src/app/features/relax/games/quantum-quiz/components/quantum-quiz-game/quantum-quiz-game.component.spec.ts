import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../../services/quiz-manager.service';
import { QuantumQuizGameComponent } from './quantum-quiz-game.component';

describe('QuantumQuizGameComponent', () => {
  let component: QuantumQuizGameComponent;
  let fixture: ComponentFixture<QuantumQuizGameComponent>;
  let gameManager: QuizManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizGameComponent, SharedTestingModule],
      providers: [QuizManagerService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    gameManager = TestBed.inject(QuizManagerService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantumQuizGameComponent);
    component = fixture.componentInstance;

    gameManager.questions.set(
      Array.from({ length: 15 }, () => {
        return {
          question: 'Test Question',
          answers: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
        };
      }),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select option A', () => {
    spyOn(component, 'correctAnswerLetter').and.returnValue('A');
    spyOn(component, 'nextQuestion');

    fixture.detectChanges();

    const buttonA = fixture.componentInstance.answerRefA().nativeElement;
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

  it('should set game over when answer is wrong', () => {
    const questions = component.quizQuestions();
    /// set correct option to B
    questions[component.level()].correctAnswer = 0;

    component.selectOption('B');

    expect(component.state()).toBe('wrong');
  });

  it('should create next question and set state to pending', () => {
    const initLevel = component.level();

    component.nextQuestion();

    expect(component.level()).toBe(initLevel + 1);
    expect(component.state()).toBe('pending');
  });

  it('should return correct answer letter', () => {
    const level = component.level();
    function updateCorrectAnswer(index: number) {
      const questions = component.quizQuestions();
      questions[level].correctAnswer = index;
      component.quizQuestions.set([...questions]);
    }

    const entries = component.quizQuestions()[level].answers.entries();
    for (const [i, key] of entries) {
      updateCorrectAnswer(i);
      expect(component.correctAnswerLetter()).toBe(key);
    }
  });

  it("should throw error if answer didn't exists", () => {
    const level = component.level();
    const questions = component.quizQuestions();
    questions[level].correctAnswer = 5;
    component.quizQuestions.set([...questions]);

    expect(() => component.correctAnswerLetter()).toThrowError();
  });
  
  describe('Keyboard events', () => {
    it('should select option A when key 1 is pressed', () => {
      spyOn(component, 'selectOption');
      const event = new KeyboardEvent('keydown', { key: '1' });
      document.dispatchEvent(event);
      expect(component.selectOption).toHaveBeenCalledWith('A');
    });

    it('should select option B when key 2 is pressed', () => {
      spyOn(component, 'selectOption');
      const event = new KeyboardEvent('keydown', { key: '2' });
      document.dispatchEvent(event);
      expect(component.selectOption).toHaveBeenCalledWith('B');
    });

    it('should select option C when key 3 is pressed', () => {
      spyOn(component, 'selectOption');
      const event = new KeyboardEvent('keydown', { key: '3' });
      document.dispatchEvent(event);
      expect(component.selectOption).toHaveBeenCalledWith('C');
    });

    it('should select option D when key 4 is pressed', () => {
      spyOn(component, 'selectOption');
      const event = new KeyboardEvent('keydown', { key: '4' });
      document.dispatchEvent(event);
      expect(component.selectOption).toHaveBeenCalledWith('D');
    });

    it('should call nextQuestion when Enter key is pressed and state is correct', () => {
      spyOn(component, 'nextQuestion');
      component.state.set('correct');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);
      expect(component.nextQuestion).toHaveBeenCalled();
    });

    it('should call nextPage when Enter key is pressed and state is wrong', () => {
      spyOn(component, 'nextPage');
      component.state.set('wrong');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);
      expect(component.nextPage).toHaveBeenCalled();
    });
  });
});
