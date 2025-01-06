import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemId } from 'src/app/layout/header/types/nav-item-id.type';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { RecommendedPagesComponent } from './recommended-pages.component';

describe('RecommendedPagesComponent', () => {
  let component: RecommendedPagesComponent;
  let fixture: ComponentFixture<RecommendedPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedPagesComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedPagesComponent);
    const activeId: NavItemId = 'aboutMe';
    fixture.componentRef.setInput('activeId', activeId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
