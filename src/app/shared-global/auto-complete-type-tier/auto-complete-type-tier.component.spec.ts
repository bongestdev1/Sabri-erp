import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteTypeTierComponent } from './auto-complete-type-tier.component';

describe('AutoCompleteTypeTierComponent', () => {
  let component: AutoCompleteTypeTierComponent;
  let fixture: ComponentFixture<AutoCompleteTypeTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteTypeTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteTypeTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
