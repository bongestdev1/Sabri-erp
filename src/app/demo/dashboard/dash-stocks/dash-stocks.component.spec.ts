import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStocksComponent } from './dash-stocks.component';

describe('DashStocksComponent', () => {
  let component: DashStocksComponent;
  let fixture: ComponentFixture<DashStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
