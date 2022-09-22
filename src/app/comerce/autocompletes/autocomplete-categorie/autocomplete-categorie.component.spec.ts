import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCategorieComponent } from './autocomplete-categorie.component';

describe('AutocompleteCategorieComponent', () => {
  let component: AutocompleteCategorieComponent;
  let fixture: ComponentFixture<AutocompleteCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
