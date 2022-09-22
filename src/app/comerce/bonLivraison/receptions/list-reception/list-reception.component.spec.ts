import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceptionComponent } from './list-reception.component';

describe('ListReceptionComponent', () => {
  let component: ListReceptionComponent;
  let fixture: ComponentFixture<ListReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
