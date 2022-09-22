import { TestBed } from '@angular/core/testing';

import { ImpressionDocumentService } from './impression-document.service';

describe('ImpressionDocumentService', () => {
  let service: ImpressionDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpressionDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
