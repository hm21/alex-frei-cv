import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizComponent } from './quantum-quiz.component';

describe('QuantumQuizComponent', () => {
  let component: QuantumQuizComponent;
  let fixture: ComponentFixture<QuantumQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizComponent, SharedTestingModule]
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
