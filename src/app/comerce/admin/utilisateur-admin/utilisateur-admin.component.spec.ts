import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurAdminComponent } from './utilisateur-admin.component';

describe('UtilisateurAdminComponent', () => {
  let component: UtilisateurAdminComponent;
  let fixture: ComponentFixture<UtilisateurAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
