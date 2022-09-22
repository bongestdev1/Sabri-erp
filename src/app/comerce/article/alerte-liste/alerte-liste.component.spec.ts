import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteListeComponent } from './alerte-liste.component';

describe('AlerteListeComponent', () => {
  let component: AlerteListeComponent;
  let fixture: ComponentFixture<AlerteListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerteListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
