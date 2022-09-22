import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousFamilleModalComponent } from './add-sous-famille-modal.component';

describe('AddSousFamilleModalComponent', () => {
  let component: AddSousFamilleModalComponent;
  let fixture: ComponentFixture<AddSousFamilleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSousFamilleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSousFamilleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
