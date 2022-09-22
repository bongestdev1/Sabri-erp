import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsBonLivraisonComponent } from './reglements-bon-livraison.component';

describe('ReglementsBonLivraisonComponent', () => {
  let component: ReglementsBonLivraisonComponent;
  let fixture: ComponentFixture<ReglementsBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementsBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
