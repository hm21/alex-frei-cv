import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumQuizGameComponent } from './quantum-quiz-game.component';

describe('QuantumQuizGameComponent', () => {
  let component: QuantumQuizGameComponent;
  let fixture: ComponentFixture<QuantumQuizGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantumQuizGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});