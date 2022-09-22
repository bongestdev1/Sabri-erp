import { TestBed } from '@angular/core/testing';

import { GenerationPdfFactureService } from './generation-pdf-facture.service';

describe('GenerationPdfFactureService', () => {
  let service: GenerationPdfFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerationPdfFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
