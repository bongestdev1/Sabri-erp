import { TestBed } from '@angular/core/testing';

import { ObjetsAutocompleteService } from './objets-autocomplete.service';

describe('ObjetsAutocompleteService', () => {
  let service: ObjetsAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetsAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
