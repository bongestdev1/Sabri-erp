import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeleModalComponent } from './add-modele-modal.component';

describe('AddModeleModalComponent', () => {
  let component: AddModeleModalComponent;
  let fixture: ComponentFixture<AddModeleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModeleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModeleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
