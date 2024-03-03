import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ThemeSwitchComponent } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitchComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
