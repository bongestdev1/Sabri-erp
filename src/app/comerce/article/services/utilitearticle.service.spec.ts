import { TestBed } from '@angular/core/testing';

import { UtilitearticleService } from './utilitearticle.service';

describe('UtilitearticleService', () => {
  let service: UtilitearticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitearticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
