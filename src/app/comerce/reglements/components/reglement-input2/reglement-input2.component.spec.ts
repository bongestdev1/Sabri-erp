import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementInput2Component } from './reglement-input2.component';

describe('ReglementInput2Component', () => {
  let component: ReglementInput2Component;
  let fixture: ComponentFixture<ReglementInput2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementInput2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
