import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TypewriterComponent } from './typewriter.component';

describe('WaioTypewriterComponent', () => {
  let component: TypewriterComponent;
  let fixture: ComponentFixture<TypewriterComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedTestingModule,
        TypewriterComponent,
      ],
    }).overrideComponent(TypewriterComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input for items', () => {
    component.items = ['item1', 'item2'];
    expect(component.items).toEqual(['item1', 'item2']);
  });
});
