import { Component, input, OnInit, output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { filter, fromEvent, timer } from 'rxjs';
import { ModalCloseButtonDirective } from 'src/app/directives/modal-close-button.directive';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-modal-header',
  imports: [TooltipDirective, ModalCloseButtonDirective, SafePipe],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss',
  host: {
    class: 'frosted-glass',
  },
})
export class ModalHeaderComponent extends ExtendedComponent implements OnInit {
  public startCloseModal = output();
  public endCloseModal = output();

  public logo = input<SafeHtml>();
  public title = input.required<string>();
  public subtitle = input.required<string>();

  public modalAnimationDurationOut = input(300);
  public enableEscapeButton = input(true);

  override ngOnInit(): void {
    this.initKeyListeners();
    super.ngOnInit();
  }

  /** Initializes key event listeners. */
  private initKeyListeners() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        this.destroyPipe(),
        filter(() => this.enableEscapeButton()),
      )
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      });
  }

  /** Closes the modal. */
  public closeModal() {
    this.startCloseModal.emit();

    timer(this.modalAnimationDurationOut())
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.endCloseModal.emit();
      });
  }
}