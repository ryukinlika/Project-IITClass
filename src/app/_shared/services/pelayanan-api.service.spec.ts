import { TestBed } from '@angular/core/testing';

import { PelayananAPIService } from './pelayanan-api.service';

describe('PelayananAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PelayananAPIService = TestBed.get(PelayananAPIService);
    expect(service).toBeTruthy();
  });
});
