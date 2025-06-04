import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEnd } from '@angular/router';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { NavItemsComponent } from './nav-items.component';

describe('NavItemsComponent', () => {
  let component: NavItemsComponent;
  let fixture: ComponentFixture<NavItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createNavItems and listenRouteChanges on ngOnInit', () => {
    const createNavItemsSpy = spyOn<any>(
      component,
      'createNavItems',
    ).and.callThrough();
    const listenRouteChangesSpy = spyOn<any>(
      component,
      'listenRouteChanges',
    ).and.callThrough();
    component.ngOnInit();
    expect(createNavItemsSpy).toHaveBeenCalled();
    expect(listenRouteChangesSpy).toHaveBeenCalled();
  });

  it('should clear navItemsRef on ngOnDestroy', () => {
    const clearSpy = jasmine.createSpy('clear');
    (component as any).navItemsRef = () => ({ clear: clearSpy });
    component.ngOnDestroy();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should not subscribe to router events if isServer is true', () => {
    (component as any).isServer = true;
    const routerEventsSpy = spyOn((component as any).router.events, 'pipe');
    (component as any).listenRouteChanges();
    expect(routerEventsSpy).not.toHaveBeenCalled();
  });

  it('should update indicator style on NavigationEnd event', () => {
    (component as any).isServer = false;
    const fakeAnchor = {
      nativeElement: {
        id: 'test',
        offsetLeft: 10,
        getBoundingClientRect: () => ({ width: 100 }),
      },
    };
    (component as any).links = () => [fakeAnchor];
    const indicatorStyle = { left: '', width: '' };
    (component as any).indicator = () => ({
      nativeElement: { style: indicatorStyle },
    });

    const router = (component as any).router;
    const destroyPipe = () => (source: any) => source;
    spyOn(component as any, 'destroyPipe').and.returnValue(destroyPipe);

    // Simulate router.events as observable
    spyOnProperty(router, 'events', 'get').and.returnValue({
      pipe: () => ({
        subscribe: (fn: any) => {
          fn(new NavigationEnd(1, '/foo', '/test'));
        },
      }),
    });

    (component as any).listenRouteChanges();

    expect(indicatorStyle.left).toBe('10px');
    expect(indicatorStyle.width).toBe('100px');
  });
});
