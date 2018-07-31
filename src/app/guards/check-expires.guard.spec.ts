import { TestBed, async, inject } from '@angular/core/testing';

import { CheckExpiresGuard } from './check-expires.guard';

describe('CheckExpiresGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckExpiresGuard]
    });
  });

  it('should ...', inject([CheckExpiresGuard], (guard: CheckExpiresGuard) => {
    expect(guard).toBeTruthy();
  }));
});
