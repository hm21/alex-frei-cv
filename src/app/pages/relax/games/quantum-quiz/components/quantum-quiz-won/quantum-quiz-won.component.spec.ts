import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizWonComponent } from './quantum-quiz-won.component';

describe('QuantumQuizWonComponent', () => {
  let component: QuantumQuizWonComponent;
  let fixture: ComponentFixture<QuantumQuizWonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizWonComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantumQuizWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
