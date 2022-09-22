import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSousFamilleComponent } from './autocomplete-sous-famille.component';

describe('AutocompleteSousFamilleComponent', () => {
  let component: AutocompleteSousFamilleComponent;
  let fixture: ComponentFixture<AutocompleteSousFamilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteSousFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteSousFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
