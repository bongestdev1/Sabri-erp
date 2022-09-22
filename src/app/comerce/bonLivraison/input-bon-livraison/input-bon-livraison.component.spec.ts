import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBonLivraisonComponent } from './input-bon-livraison.component';

describe('InputBonLivraisonComponent', () => {
  let component: InputBonLivraisonComponent;
  let fixture: ComponentFixture<InputBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
