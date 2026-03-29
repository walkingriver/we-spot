import {
  Directive,
  HostListener,
  OnDestroy,
  OnInit,
  input,
  output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime as throttleTimeOperator } from 'rxjs/operators';

@Directive({
  selector: '[appThrottledClick]',
  standalone: true,
})
export class ThrottledClickDirective implements OnInit, OnDestroy {
  /** Milliseconds between emitted clicks. */
  readonly throttleTime = input(500);
  readonly throttledClick = output<MouseEvent>();

  private clicks = new Subject<MouseEvent>();
  private subscription?: Subscription;

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(throttleTimeOperator(this.throttleTime()))
      .subscribe((e) => this.throttledClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
