import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumQuizComponent } from './quantum-quiz.component';

describe('QuantumQuizComponent', () => {
  let component: QuantumQuizComponent;
  let fixture: ComponentFixture<QuantumQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantumQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
