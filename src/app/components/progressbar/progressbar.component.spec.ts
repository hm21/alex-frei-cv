import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProgressbarComponent } from './progressbar.component';

describe('ProgressbarComponent', () => {
  let component: ProgressbarComponent;
  let fixture: ComponentFixture<ProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressbarComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
