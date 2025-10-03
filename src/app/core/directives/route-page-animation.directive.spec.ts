import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { RoutePageAnimationDirective } from './route-page-animation.directive';

@Component({
  template: `
    <div afRoutePageAnimation>
      <router-outlet></router-outlet>
    </div>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
class TestComponent {}

describe('RoutePageAnimationDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: RoutePageAnimationDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule, RouterOutlet, RoutePageAnimationDirective],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(
      By.directive(RoutePageAnimationDirective),
    );
    directive = directiveEl.injector.get(RoutePageAnimationDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
