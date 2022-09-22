import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNavbarSocieteComponent } from './list-navbar-societe.component';

describe('ListNavbarSocieteComponent', () => {
  let component: ListNavbarSocieteComponent;
  let fixture: ComponentFixture<ListNavbarSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNavbarSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNavbarSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
