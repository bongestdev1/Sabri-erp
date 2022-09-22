import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilleModalComponent } from './add-famille-modal.component';

describe('AddFamilleModalComponent', () => {
  let component: AddFamilleModalComponent;
  let fixture: ComponentFixture<AddFamilleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFamilleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamilleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
