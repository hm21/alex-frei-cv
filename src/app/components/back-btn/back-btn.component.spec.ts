import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { BackBtnComponent } from './back-btn.component';

describe('BackBtnComponent', () => {
  let component: BackBtnComponent;
  let fixture: ComponentFixture<BackBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackBtnComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
