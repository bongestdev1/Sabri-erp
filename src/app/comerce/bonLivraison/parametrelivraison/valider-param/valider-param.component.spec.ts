import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderParamComponent } from './valider-param.component';

describe('ValiderParamComponent', () => {
  let component: ValiderParamComponent;
  let fixture: ComponentFixture<ValiderParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
