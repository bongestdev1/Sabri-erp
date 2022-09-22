import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMarqueComponent } from './autocomplete-marque.component';

describe('AutocompleteMarqueComponent', () => {
  let component: AutocompleteMarqueComponent;
  let fixture: ComponentFixture<AutocompleteMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
