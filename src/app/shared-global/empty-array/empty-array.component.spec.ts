import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyArrayComponent } from './empty-array.component';

describe('EmptyArrayComponent', () => {
  let component: EmptyArrayComponent;
  let fixture: ComponentFixture<EmptyArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
