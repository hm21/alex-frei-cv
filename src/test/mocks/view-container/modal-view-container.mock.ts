import { ComponentRef, EventEmitter, Injectable } from '@angular/core';

const componentRefMock = {
  instance: {
    onClose: new EventEmitter(),
  },
  changeDetectorRef: {
    detectChanges: jasmine.createSpy('detectChanges'),
  },
  setInput: jasmine
    .createSpy('setInput')
    .and.callFake((key: string, value: any) => {
      componentRefMock.instance[key] = value;
    }),
} as unknown as ComponentRef<any>;

@Injectable()
export class MockModalViewContainerRef {
  createEmbeddedView = jasmine.createSpy('createEmbeddedView');
  createComponent = jasmine
    .createSpy('createComponent')
    .and.returnValue(componentRefMock);
  clear = jasmine.createSpy('clear');
  insert = jasmine.createSpy('insert');
  remove = jasmine.createSpy('remove');
}
