import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementFournisseurComponent } from './classement-fournisseur.component';

describe('ClassementFournisseurComponent', () => {
  let component: ClassementFournisseurComponent;
  let fixture: ComponentFixture<ClassementFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
