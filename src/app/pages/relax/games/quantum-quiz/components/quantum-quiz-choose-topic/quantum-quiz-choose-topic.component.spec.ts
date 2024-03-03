import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizChooseTopicComponent } from './quantum-quiz-choose-topic.component';

describe('QuantumQuizChooseTopicComponent', () => {
  let component: QuantumQuizChooseTopicComponent;
  let fixture: ComponentFixture<QuantumQuizChooseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumQuizChooseTopicComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantumQuizChooseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
