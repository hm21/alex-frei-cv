import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { runPageMetaTests } from 'src/test/utils/page-meta-test.helper';
import { ColorClashComponent } from './color-clash.component';
import { ColorClashManagerService } from './services/color-clash-manager.service';

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

  runPageMetaTests(() => component);
});
