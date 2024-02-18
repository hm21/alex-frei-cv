import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPagesComponent } from './recommended-pages.component';

describe('RecommendedPagesComponent', () => {
  let component: RecommendedPagesComponent;
  let fixture: ComponentFixture<RecommendedPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
