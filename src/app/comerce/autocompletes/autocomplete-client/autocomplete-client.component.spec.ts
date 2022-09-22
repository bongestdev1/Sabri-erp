import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteClientComponent } from './autocomplete-client.component';

describe('AutocompleteClientComponent', () => {
  let component: AutocompleteClientComponent;
  let fixture: ComponentFixture<AutocompleteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
