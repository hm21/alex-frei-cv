import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ScreenService } from '../screen/screen.service';
import {
  AnimationElementI,
  CardEffectManagerService,
} from './card-effect-manager.service';

describe('CardEffectManagerService', () => {
  let service: CardEffectManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [
        CardEffectManagerService,
        {
          provide: ScreenService,
          useValue: {
            height: 800,
          },
        },
      ],
    });
    service = TestBed.inject(CardEffectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an element and initialize random interval', () => {
    const item: AnimationElementI = {
      id: 'test1',
      element: document.createElement('div'),
      callback: jasmine.createSpy('callback'),
    };

    spyOn<any>(service, 'initRandom').and.callThrough();
    service.addElement(item);

    expect(service['animationItems'].length).toBe(1);
    expect(service['initRandom']).toHaveBeenCalled();
  });

  it('should remove an element and stop random interval if no elements left', () => {
    const item: AnimationElementI = {
      id: 'test1',
      element: document.createElement('div'),
      callback: jasmine.createSpy('callback'),
    };

    service.addElement(item);
    spyOn(service['stopRandomInterval$'], 'next').and.callThrough();
    service.removeElement(item);

    expect(service['animationItems'].length).toBe(0);
    expect(service['stopRandomInterval$'].next).toHaveBeenCalled();
  });

  it('should check if element is visible', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    element.style.position = 'absolute';
    element.style.top = '100px';
    element.style.height = '100px';

    const isVisible = service['isElementVisible'](element);
    expect(isVisible).toBeTrue();
  });
});
