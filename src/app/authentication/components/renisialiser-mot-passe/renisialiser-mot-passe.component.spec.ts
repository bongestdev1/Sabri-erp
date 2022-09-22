import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenisialiserMotPasseComponent } from './renisialiser-mot-passe.component';

describe('RenisialiserMotPasseComponent', () => {
  let component: RenisialiserMotPasseComponent;
  let fixture: ComponentFixture<RenisialiserMotPasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenisialiserMotPasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenisialiserMotPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
