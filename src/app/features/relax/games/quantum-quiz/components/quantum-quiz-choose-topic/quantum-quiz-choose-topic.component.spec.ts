import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../../services/quiz-manager.service';
import { QuantumQuizChooseTopicComponent } from './quantum-quiz-choose-topic.component';

describe('QuantumQuizChooseTopicComponent', () => {
  let component: QuantumQuizChooseTopicComponent;
  let fixture: ComponentFixture<QuantumQuizChooseTopicComponent>;
  let quizManagerService: QuizManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuantumQuizChooseTopicComponent,
        SharedTestingModule,
        FormsModule,
      ],
      providers: [QuizManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizChooseTopicComponent);
    component = fixture.componentInstance;
    quizManagerService = TestBed.inject(QuizManagerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add "card" class on init', () => {
    component.ngOnInit();
    expect(component.classList.contains('card')).toBeTrue();
  });

  it('should display error message if generateErrorMsg returns a message', () => {
    spyOn(quizManagerService, 'generateErrorMsg').and.returnValue(
      'Error message',
    );
    spyOn(component, 'createError' as any);
    component.ngOnInit();
    expect(component['createError']).toHaveBeenCalledWith('Error message');
  });

  it('should clear errorRef on destroy', () => {
    spyOn(component['errorRef'](), 'clear');
    component.ngOnDestroy();
    expect(component['errorRef']().clear).toHaveBeenCalled();
  });

  it('should generate quiz with random topic', () => {
    spyOn(quizManagerService, 'generateQuiz');
    component.generate(true);
    expect(quizManagerService.generateQuiz).toHaveBeenCalledWith(undefined);
  });

  it('should generate quiz with selected topic', () => {
    spyOn(quizManagerService, 'generateQuiz');
    component.topic.set('Science');
    component.generate(false);
    expect(quizManagerService.generateQuiz).toHaveBeenCalledWith('Science');
  });

  it('should display error if topic length is less than 3 characters', () => {
    spyOn(component, 'createError' as any);
    component.topic.set('ab');
    component.generate(false);
    expect(component['createError']).toHaveBeenCalledWith(
      'The topic must be between 3 and 20 characters long!',
    );
  });

  it('should display error if topic length is more than 20 characters', () => {
    spyOn(component, 'createError' as any);
    component.topic.set('a'.repeat(21));
    component.generate(false);
    expect(component['createError']).toHaveBeenCalledWith(
      'The topic must be between 3 and 20 characters long!',
    );
  });

  it('should display error if topic is a number', () => {
    spyOn(component, 'createError' as any);
    component.topic.set('123');
    component.generate(false);
    expect(component['createError']).toHaveBeenCalledWith(
      'The topic must be a text and not a number',
    );
  });

  it('should clear errorRef before generating quiz', () => {
    spyOn(component['errorRef'](), 'clear');
    component.generate(false);
    expect(component['errorRef']().clear).toHaveBeenCalled();
  });
});
