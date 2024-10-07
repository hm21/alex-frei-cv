import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOCUMENT } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { Modal } from './modal.base';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'af-mock-modal',
  template: '<div>Mock Modal</div>',
})
class MockModalComponent extends Modal<unknown> {}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let documentMock: Document;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;

  beforeEach(async () => {
    documentMock = document;
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', [
      'createComponent',
      'remove',
    ]);

    await TestBed.configureTestingModule({
      imports: [ModalComponent, SharedTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should open a modal and add it to _components', async () => {
    const modalId = 'testModal';

    viewContainerRefMock.createComponent(MockModalComponent);
    component.open(modalId, MockModalComponent, { data: {} });

    expect(component['_components'].length).toBe(1);
    expect(component['_components'][0].id).toBe(modalId);
    expect(documentMock.body.style.overflow).toBe('hidden');
  });

  it('should close a specific modal by id', async () => {
    const modalId = 'testModal';

    component.open(modalId, MockModalComponent, { data: {} });

    component.close(modalId);

    expect(component['_components'].length).toBe(0);
    expect(documentMock.body.style.overflow).toBe('');
  });

  it('should close the last opened modal if no id is provided', async () => {
    component.open('modal1', MockModalComponent, { data: {} });
    component.open('modal2', MockModalComponent, { data: {} });

    component.close();

    expect(component['_components'].length).toBe(1);
    expect(component['_components'][0].id).toBe('modal1');
  });

  it('should clear all modals', async () => {
    component.open('modal1', MockModalComponent, { data: {} });
    component.open('modal2', MockModalComponent, { data: {} });

    component.clearAll();

    expect(component['_components'].length).toBe(0);
    expect(documentMock.body.style.overflow).toBe('');
  });
});
