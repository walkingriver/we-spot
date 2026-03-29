import { TestBed } from '@angular/core/testing';
import { ShuffleService } from './shuffle.service';

describe('ShuffleService', () => {
  let service: ShuffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should produce deterministic order for same seed', () => {
    service.seed('test-game');
    const a = service.shuffle([1, 2, 3, 4, 5]);
    service.seed('test-game');
    const b = service.shuffle([1, 2, 3, 4, 5]);
    expect(a).toEqual(b);
  });
});
