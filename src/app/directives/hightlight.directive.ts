import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

@Directive({
  selector: '[appHightlight]',
})
export class HightlightDirective {
  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      'green',
      RendererStyleFlags2.DashCase,
    );
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      'transparent',
      RendererStyleFlags2.DashCase,
    );
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
}
