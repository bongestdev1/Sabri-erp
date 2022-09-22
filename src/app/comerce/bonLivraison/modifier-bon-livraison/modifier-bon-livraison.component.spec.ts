import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonLivraisonComponent } from './modifier-bon-livraison.component';

describe('ModifierBonLivraisonComponent', () => {
  let component: ModifierBonLivraisonComponent;
  let fixture: ComponentFixture<ModifierBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
