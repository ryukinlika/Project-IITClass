import { TestBed } from '@angular/core/testing';

import { PelayanApiService } from './pelayanan-api.service';

describe('PelayananAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PelayanApiService = TestBed.get(PelayanApiService);
    expect(service).toBeTruthy();
  });
});
