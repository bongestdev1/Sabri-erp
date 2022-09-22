import { TestBed } from '@angular/core/testing';

import { FonctionsBonLivraisonService } from './fonctions-bon-livraison.service';

describe('FonctionsBonLivraisonService', () => {
  let service: FonctionsBonLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionsBonLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
