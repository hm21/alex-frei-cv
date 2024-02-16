import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeServicesComponent } from './about-me-services.component';

describe('AboutMeServicesComponent', () => {
  let component: AboutMeServicesComponent;
  let fixture: ComponentFixture<AboutMeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
