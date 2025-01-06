import { Directive, inject, input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, merge } from 'rxjs';
import { IdManagerService } from 'src/app/core/services/id-manager/id-manager.service';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { TooltipService } from '../services/tooltip.service';

@Directive({
  selector: '[afTooltip]',
  standalone: true,
})
export class TooltipDirective
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  private tooltipService = inject(TooltipService);
  private idManager = inject(IdManagerService);

  public tooltip = input.required<string>({ alias: 'afTooltip' });

  private id!: string;

  override ngOnInit(): void {
    super.ngOnInit();
    this.create();
    this.listenEvents();
  }

  ngOnDestroy(): void {
    this.remove();
  }

  private create() {
    this.id = this.idManager.generateUniqueId();

    this.tooltipService.create({
      id: this.id,
      message: this.tooltip(),
      parent: this.elRef.nativeElement,
      visible: false,
    });
  }
  private remove() {
    this.tooltipService.remove(this.id);
  }

  private listenEvents() {
    merge(
      fromEvent(this.nativeElement, 'mouseover').pipe(map(() => true)),
      fromEvent(this.nativeElement, 'mouseleave').pipe(map(() => false)),
    )
      .pipe(this.destroyPipe())
      .subscribe((show) => {
        if (show) {
          this.tooltipService.show(this.id);
        } else {
          this.tooltipService.hide(this.id);
        }
      });
  }
}
