import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomRotation]'
})
export class RandomRotationDirective implements OnInit {
  appRandomRotation = Math.random() * 360;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer
      .setStyle(this.element.nativeElement, 'transform', `rotate(${this.appRandomRotation}deg)`);
  }
}
