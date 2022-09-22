import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresImportationsPageComponent } from './parametres-importations-page.component';

describe('ParametresImportationsPageComponent', () => {
  let component: ParametresImportationsPageComponent;
  let fixture: ComponentFixture<ParametresImportationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresImportationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresImportationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
