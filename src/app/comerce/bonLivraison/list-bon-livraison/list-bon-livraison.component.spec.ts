import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonLivraisonComponent } from './list-bon-livraison.component';

describe('ListBonLivraisonComponent', () => {
  let component: ListBonLivraisonComponent;
  let fixture: ComponentFixture<ListBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
