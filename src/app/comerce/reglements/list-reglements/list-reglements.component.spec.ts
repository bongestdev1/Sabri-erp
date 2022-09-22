import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReglementsComponent } from './list-reglements.component';

describe('ListReglementsComponent', () => {
  let component: ListReglementsComponent;
  let fixture: ComponentFixture<ListReglementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReglementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReglementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
