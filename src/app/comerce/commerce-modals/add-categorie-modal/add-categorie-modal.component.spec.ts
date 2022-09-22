import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorieModalComponent } from './add-categorie-modal.component';

describe('AddCategorieModalComponent', () => {
  let component: AddCategorieModalComponent;
  let fixture: ComponentFixture<AddCategorieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategorieModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategorieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
