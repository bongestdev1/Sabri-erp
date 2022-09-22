import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveFournisseurComponent } from './releve-fournisseur.component';

describe('ReleveFournisseurComponent', () => {
  let component: ReleveFournisseurComponent;
  let fixture: ComponentFixture<ReleveFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
