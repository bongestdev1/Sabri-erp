import { TestBed } from '@angular/core/testing';

import { InformationsService } from './informations.service';

describe('InformationsService', () => {
  let service: InformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
