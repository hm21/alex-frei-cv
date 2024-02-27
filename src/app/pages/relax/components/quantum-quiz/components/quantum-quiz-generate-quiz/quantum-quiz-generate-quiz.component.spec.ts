import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumQuizGenerateQuizComponent } from './quantum-quiz-generate-quiz.component';

describe('QuantumQuizGenerateQuizComponent', () => {
  let component: QuantumQuizGenerateQuizComponent;
  let fixture: ComponentFixture<QuantumQuizGenerateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizGenerateQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantumQuizGenerateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
