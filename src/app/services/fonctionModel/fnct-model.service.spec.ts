import { TestBed } from '@angular/core/testing';

import { FnctModelService } from './fnct-model.service';

describe('FnctModelService', () => {
  let service: FnctModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FnctModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
