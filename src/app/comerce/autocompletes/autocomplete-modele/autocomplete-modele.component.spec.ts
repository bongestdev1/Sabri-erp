import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteModeleComponent } from './autocomplete-modele.component';

describe('AutocompleteModeleComponent', () => {
  let component: AutocompleteModeleComponent;
  let fixture: ComponentFixture<AutocompleteModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
