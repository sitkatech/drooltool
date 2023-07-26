import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from './cookie-storage.service';

describe('CookieStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieStorageService = TestBed.inject(CookieStorageService);
    expect(service).toBeTruthy();
  });
});
