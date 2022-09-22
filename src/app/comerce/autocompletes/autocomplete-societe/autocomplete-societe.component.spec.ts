import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSocieteComponent } from './autocomplete-societe.component';

describe('AutocompleteSocieteComponent', () => {
  let component: AutocompleteSocieteComponent;
  let fixture: ComponentFixture<AutocompleteSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
