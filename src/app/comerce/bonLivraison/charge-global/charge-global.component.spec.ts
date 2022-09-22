import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeGlobalComponent } from './charge-global.component';

describe('ChargeGlobalComponent', () => {
  let component: ChargeGlobalComponent;
  let fixture: ComponentFixture<ChargeGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
