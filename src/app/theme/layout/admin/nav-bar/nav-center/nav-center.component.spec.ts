import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCenterComponent } from './nav-center.component';

describe('NavCenterComponent', () => {
  let component: NavCenterComponent;
  let fixture: ComponentFixture<NavCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
