import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ThemeManagerService } from 'src/app/core/services/theme-manager/theme-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuantumQuizHackerComponent } from './quantum-quiz-hacker.component';

describe('QuantumQuizHackerComponent', () => {
  let component: QuantumQuizHackerComponent;
  let fixture: ComponentFixture<QuantumQuizHackerComponent>;
  let themeManagerService: ThemeManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedTestingModule,
        RouterLink,
        QuicklinkDirective,
        QuantumQuizHackerComponent,
      ],
      providers: [ThemeManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumQuizHackerComponent);
    component = fixture.componentInstance;
    themeManagerService = TestBed.inject(ThemeManagerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add card class on init', () => {
    expect(component.classList.contains('card')).toBeTrue();
  });

  it('should set dark mode if not already dark mode on init', () => {
    themeManagerService.isDarkMode.set(false);
    component.ngOnInit();
    expect(themeManagerService.isDarkMode()).toBe(true);
  });

  it('should not set dark mode if already dark mode on init', () => {
    themeManagerService.isDarkMode.set(true);
    component.ngOnInit();
    expect(themeManagerService.isDarkMode()).toBe(true);
  });

  it('should reset dark mode on destroy if it was not dark mode initially', () => {
    themeManagerService.isDarkMode.set(false);
    component.ngOnInit();
    component.ngOnDestroy();
    expect(themeManagerService.isDarkMode()).toBe(false);
  });

  it('should not reset dark mode on destroy if it was dark mode initially', () => {
    themeManagerService.isDarkMode.set(true);
    component.ngOnInit();
    component.ngOnDestroy();
    expect(themeManagerService.isDarkMode()).toBe(true);
  });
});
