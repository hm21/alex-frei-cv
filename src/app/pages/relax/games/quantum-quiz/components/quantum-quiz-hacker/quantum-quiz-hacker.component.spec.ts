import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizHackerComponent } from './quantum-quiz-hacker.component';

describe('QuantumQuizHackerComponent', () => {
  let component: QuantumQuizHackerComponent;
  let fixture: ComponentFixture<QuantumQuizHackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, QuantumQuizHackerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizHackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
