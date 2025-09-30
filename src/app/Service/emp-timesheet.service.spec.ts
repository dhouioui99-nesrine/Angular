import { TestBed } from '@angular/core/testing';

import { EmpTimesheetService } from './emp-timesheet.service';

describe('EmpTimesheetService', () => {
  let service: EmpTimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
