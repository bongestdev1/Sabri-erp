import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFamilleComponent } from './autocomplete-famille.component';

describe('AutocompleteFamilleComponent', () => {
  let component: AutocompleteFamilleComponent;
  let fixture: ComponentFixture<AutocompleteFamilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
