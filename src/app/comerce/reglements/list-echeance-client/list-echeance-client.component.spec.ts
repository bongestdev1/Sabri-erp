import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEcheanceClientComponent } from './list-echeance-client.component';

describe('ListEcheanceClientComponent', () => {
  let component: ListEcheanceClientComponent;
  let fixture: ComponentFixture<ListEcheanceClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEcheanceClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEcheanceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
