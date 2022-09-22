import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAchatsComponent } from './dash-achats.component';

describe('DashAchatsComponent', () => {
  let component: DashAchatsComponent;
  let fixture: ComponentFixture<DashAchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashAchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
