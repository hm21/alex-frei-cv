import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaxComponent } from './relax.component';

describe('RelaxComponent', () => {
  let component: RelaxComponent;
  let fixture: ComponentFixture<RelaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
