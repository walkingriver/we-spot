import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRandomRotation]',
  standalone: true,
})
export class RandomRotationDirective implements OnInit {
  appRandomRotation = Math.random() * 360;

  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      `rotate(${this.appRandomRotation}deg)`,
    );
  }
}
