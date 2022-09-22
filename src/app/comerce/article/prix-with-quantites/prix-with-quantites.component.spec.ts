import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixWithQuantitesComponent } from './prix-with-quantites.component';

describe('PrixWithQuantitesComponent', () => {
  let component: PrixWithQuantitesComponent;
  let fixture: ComponentFixture<PrixWithQuantitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrixWithQuantitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixWithQuantitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
