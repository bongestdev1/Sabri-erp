import { TestBed } from '@angular/core/testing';

import { ImportationsService } from './importations.service';

describe('ImportationsService', () => {
  let service: ImportationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
