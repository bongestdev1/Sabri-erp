import { TestBed } from '@angular/core/testing';

import { FctListService } from './fct-list.service';

describe('FctListService', () => {
  let service: FctListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FctListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
