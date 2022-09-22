import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGmoComponent } from './dash-gmo.component';

describe('DashGmoComponent', () => {
  let component: DashGmoComponent;
  let fixture: ComponentFixture<DashGmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashGmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashGmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
