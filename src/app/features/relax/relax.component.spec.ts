import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideServiceWorker } from '@angular/service-worker';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { runPageMetaTests } from 'src/test/utils/page-meta-test.helper';
import { RelaxComponent } from './relax.component';

describe('RelaxComponent', () => {
  let component: RelaxComponent;
  let fixture: ComponentFixture<RelaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideServiceWorker('ngsw-worker.js')],
      imports: [RelaxComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RelaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runPageMetaTests(() => component);
});
