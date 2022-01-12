import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobbleCardComponent } from './dobble-card.component';

describe('DobbleCardComponent', () => {
  let component: DobbleCardComponent;
  let fixture: ComponentFixture<DobbleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobbleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DobbleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
