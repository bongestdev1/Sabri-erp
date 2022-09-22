import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFournisseurComponent } from './autocomplete-fournisseur.component';

describe('AutocompleteFournisseurComponent', () => {
  let component: AutocompleteFournisseurComponent;
  let fixture: ComponentFixture<AutocompleteFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
