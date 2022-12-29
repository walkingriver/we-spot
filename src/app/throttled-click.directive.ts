import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appThrottledClick]',
  standalone: true,
})
export class ThrottledClickDirective implements OnInit, OnDestroy {
  @Input() throttleTime = 500;
  @Output() throttledClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(throttleTime(this.throttleTime))
      .subscribe(e => this.throttledClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
