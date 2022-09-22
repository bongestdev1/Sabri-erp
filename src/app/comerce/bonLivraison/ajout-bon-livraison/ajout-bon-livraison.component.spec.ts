import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonLivraisonComponent } from './ajout-bon-livraison.component';

describe('AjoutBonLivraisonComponent', () => {
  let component: AjoutBonLivraisonComponent;
  let fixture: ComponentFixture<AjoutBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
