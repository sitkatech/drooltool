import { TestBed } from '@angular/core/testing';

import { BusyService } from './busy.service';

describe('BusyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusyService = TestBed.inject(BusyService);
    expect(service).toBeTruthy();
  });
});
