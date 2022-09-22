import { TestBed } from '@angular/core/testing';

import { UtiliteService } from './utilite.service';

describe('UtiliteService', () => {
  let service: UtiliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtiliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
