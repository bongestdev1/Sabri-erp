import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListparamlivraisonComponent } from './listparamlivraison.component';

describe('ListparamlivraisonComponent', () => {
  let component: ListparamlivraisonComponent;
  let fixture: ComponentFixture<ListparamlivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListparamlivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListparamlivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
