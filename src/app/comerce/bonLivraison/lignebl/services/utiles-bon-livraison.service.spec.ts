import { TestBed } from '@angular/core/testing';

import { UtilesBonLivraisonService } from './utiles-bon-livraison.service';

describe('UtilesBonLivraisonService', () => {
  let service: UtilesBonLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilesBonLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
