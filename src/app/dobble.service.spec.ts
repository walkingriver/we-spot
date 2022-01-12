import { TestBed } from '@angular/core/testing';

import { DobbleService } from './dobble.service';

describe('DobbleService', () => {
  let service: DobbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DobbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
