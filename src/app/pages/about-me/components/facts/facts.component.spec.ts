import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { FactsComponent } from './facts.component';

describe('FactsComponent', () => {
  let component: FactsComponent;
  let fixture: ComponentFixture<FactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactsComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
