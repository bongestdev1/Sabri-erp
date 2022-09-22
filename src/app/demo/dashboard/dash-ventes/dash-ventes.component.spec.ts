import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashVentesComponent } from './dash-ventes.component';

describe('DashVentesComponent', () => {
  let component: DashVentesComponent;
  let fixture: ComponentFixture<DashVentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashVentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
