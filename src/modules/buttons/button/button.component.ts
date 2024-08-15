import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {},
})
export class ButtonComponent implements OnInit {
  @HostBinding('class.sona-button')
  class = true;
  sonaClassButton = true;
  @Input()
  iconPosition: 'left' | 'right' = 'left';

  @Input()
  gap: string = '8px';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    const flexDirection = this.iconPosition === 'left' ? 'row' : 'row-reverse';
    this.renderer.setStyle(
      this.el.nativeElement,
      'flex-direction',
      flexDirection,
      RendererStyleFlags2.DashCase,
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'column-gap',
      this.gap,
      RendererStyleFlags2.DashCase,
    );
    this.renderer.setAttribute(this.el.nativeElement, 'role', 'button');
  }
}
