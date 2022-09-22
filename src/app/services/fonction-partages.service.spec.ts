import { TestBed } from '@angular/core/testing';

import { FonctionPartagesService } from './fonction-partages.service';

describe('FonctionPartagesService', () => {
  let service: FonctionPartagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionPartagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
