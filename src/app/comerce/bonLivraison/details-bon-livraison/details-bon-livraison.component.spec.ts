import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonLivraisonComponent } from './details-bon-livraison.component';

describe('DetailsBonLivraisonComponent', () => {
  let component: DetailsBonLivraisonComponent;
  let fixture: ComponentFixture<DetailsBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
