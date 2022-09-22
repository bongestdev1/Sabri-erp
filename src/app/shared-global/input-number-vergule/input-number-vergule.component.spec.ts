import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberVerguleComponent } from './input-number-vergule.component';

describe('InputNumberVerguleComponent', () => {
  let component: InputNumberVerguleComponent;
  let fixture: ComponentFixture<InputNumberVerguleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumberVerguleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberVerguleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
