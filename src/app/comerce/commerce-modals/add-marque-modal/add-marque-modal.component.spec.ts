import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarqueModalComponent } from './add-marque-modal.component';

describe('AddMarqueModalComponent', () => {
  let component: AddMarqueModalComponent;
  let fixture: ComponentFixture<AddMarqueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarqueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarqueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
