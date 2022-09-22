import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReglementComponent } from './ajouter-reglement.component';

describe('AjouterReglementComponent', () => {
  let component: AjouterReglementComponent;
  let fixture: ComponentFixture<AjouterReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
