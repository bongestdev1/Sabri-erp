import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElementModalComponent } from './update-element-modal.component';

describe('UpdateElementModalComponent', () => {
  let component: UpdateElementModalComponent;
  let fixture: ComponentFixture<UpdateElementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateElementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateElementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
