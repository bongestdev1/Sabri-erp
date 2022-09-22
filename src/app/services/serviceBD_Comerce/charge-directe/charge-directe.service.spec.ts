import { TestBed } from '@angular/core/testing';

import { ChargeDirecteService } from './charge-directe.service';

describe('ChargeDirecteService', () => {
  let service: ChargeDirecteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeDirecteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
