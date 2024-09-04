import { ComponentRef, ViewContainerRef } from '@angular/core';

// Mock for the component instance
const componentInstanceMock = {
  someInput: undefined,
  // Add more inputs or methods as needed
};
const componentRefMock = {
  instance: componentInstanceMock,
  changeDetectorRef: {
    detectChanges: jasmine.createSpy('detectChanges'),
  },
  setInput: jasmine
    .createSpy('setInput')
    .and.callFake((key: string, value: any) => {
      componentRefMock.instance[key] = value;
    }),
} as unknown as ComponentRef<any>;

export const viewContainerRefMock = {
  createEmbeddedView: jasmine.createSpy('createEmbeddedView'),
  createComponent: jasmine
    .createSpy('createComponent')
    .and.returnValue(componentRefMock),
  clear: jasmine.createSpy('clear'),
  insert: jasmine.createSpy('insert'),
  remove: jasmine.createSpy('remove'),
} as any as ViewContainerRef;
