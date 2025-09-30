import { TestBed } from '@angular/core/testing';

import { PointageResultService } from './pointage-result.service';

describe('PointageResultService', () => {
  let service: PointageResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointageResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
