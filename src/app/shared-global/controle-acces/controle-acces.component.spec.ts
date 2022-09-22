import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleAccesComponent } from './controle-acces.component';

describe('ControleAccesComponent', () => {
  let component: ControleAccesComponent;
  let fixture: ComponentFixture<ControleAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleAccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
