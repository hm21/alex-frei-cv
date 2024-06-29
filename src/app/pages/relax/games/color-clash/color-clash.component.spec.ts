import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashComponent } from './color-clash.component';
import { ColorClashManagerService } from './utils/color-clash-manager.service';

describe('ColorClashComponent', () => {
  let component: ColorClashComponent;
  let fixture: ComponentFixture<ColorClashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashComponent, SharedTestingModule],
      providers: [ColorClashManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorClashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
