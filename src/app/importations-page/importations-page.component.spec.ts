import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationsPageComponent } from './importations-page.component';

describe('ImportationsPageComponent', () => {
  let component: ImportationsPageComponent;
  let fixture: ComponentFixture<ImportationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
