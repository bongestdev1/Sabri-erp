import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteClientComponent } from './auto-complete-client.component';

describe('AutoCompleteClientComponent', () => {
  let component: AutoCompleteClientComponent;
  let fixture: ComponentFixture<AutoCompleteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
