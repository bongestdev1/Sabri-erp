import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStockComponent } from './alert-stock.component';

describe('AlertStockComponent', () => {
  let component: AlertStockComponent;
  let fixture: ComponentFixture<AlertStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
