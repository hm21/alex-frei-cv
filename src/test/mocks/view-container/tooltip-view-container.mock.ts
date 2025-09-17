import { Injectable, signal } from '@angular/core';
import { TooltipBase } from 'src/app/ui/tooltip/interfaces/tooltip.interface';
import { TooltipItem } from 'src/app/ui/tooltip/types/tooltip.type';


@Injectable()
export class MockTooltipViewContainerRef {
  public tooltips = signal<TooltipItem[]>([]);

  createComponent = jasmine.createSpy('createComponent').and.returnValue({
    instance: {
      create: (item: TooltipItem) => {
        this.tooltips.update((el) => {
          el.push(item);
          return el;
        });
      },
      remove: (id: string) => {
        const i = this.tooltips().findIndex((e) => e.id === id);
        if (i >= 0) {
          this.tooltips.update((el) => {
            el.splice(i, 1);
            return el;
          });
        }
      },
      hide: (id) => {
        this.tooltips.update((el) => {
          const item = el.find((e) => e.id === id);
          if (item) {
            item.visible = false;
          }
          return el;
        });
      },
      show: (id) => {
        this.tooltips.update((el) => {
          const item = el.find((e) => e.id === id);
          if (item) {
            item.visible = true;
          }
          return el;
        });
      },
    } as TooltipBase,
  });
}
