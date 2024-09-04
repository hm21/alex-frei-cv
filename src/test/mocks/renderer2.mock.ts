import { Renderer2 } from '@angular/core';

export const renderer2Mock = {
  addClass: jasmine.createSpy('addClass'),
  removeClass: jasmine.createSpy('removeClass'),
  setAttribute: jasmine.createSpy('setAttribute'),
  removeAttribute: jasmine.createSpy('removeAttribute'),
  appendChild: jasmine.createSpy('appendChild'),
  removeChild: jasmine.createSpy('removeChild'),
  setStyle: jasmine.createSpy('setStyle'),
  removeStyle: jasmine.createSpy('removeStyle'),
} as any as Renderer2;
