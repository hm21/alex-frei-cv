import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import svgClose from 'src/assets/img/icon/close.svg';

@Directive({
  selector: '[afModalCloseButton]',
  standalone: true,
  host: {
    class: 'modal-close-button',
    type: 'button',
    'aria-label': $localize`Close`,
    style: `
      position: absolute;
      top: 10px;
      right: 10px;
    
      background-color: var(--page-background-primary);
      padding: 5px;
      border-radius: 100%;
      width: 32px;
      height: 32px;
    
      margin: 0px;
      outline: none;
      border: none;
    
      transition: background-color 250ms ease;
    `,
  },
})
export class ModalCloseButtonDirective implements OnInit {
  private elRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  ngOnInit(): void {
    this.elRef.nativeElement.innerHTML = svgClose;
  }
}
