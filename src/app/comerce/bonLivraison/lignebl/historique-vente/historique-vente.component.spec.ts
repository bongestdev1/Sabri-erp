import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueVenteComponent } from './historique-vente.component';

describe('HistoriqueVenteComponent', () => {
  let component: HistoriqueVenteComponent;
  let fixture: ComponentFixture<HistoriqueVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
