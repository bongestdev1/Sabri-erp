import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFinanceComponent } from './dash-finance.component';

describe('DashFinanceComponent', () => {
  let component: DashFinanceComponent;
  let fixture: ComponentFixture<DashFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
