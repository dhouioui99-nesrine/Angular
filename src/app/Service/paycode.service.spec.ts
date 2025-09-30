import { TestBed } from '@angular/core/testing';

import { PaycodeService } from './paycode.service';

describe('PaycodeService', () => {
  let service: PaycodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaycodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
