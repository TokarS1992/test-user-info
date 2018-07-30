import { TestBed, inject } from '@angular/core/testing';

import { BackendApiService } from './backend-api.interceptor';

describe('BackendApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendApiService]
    });
  });

  it('should be created', inject([BackendApiService], (service: BackendApiService) => {
    expect(service).toBeTruthy();
  }));
});
