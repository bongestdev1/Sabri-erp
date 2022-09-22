import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreDateButtonComponent } from './filtre-date-button.component';

describe('FiltreDateButtonComponent', () => {
  let component: FiltreDateButtonComponent;
  let fixture: ComponentFixture<FiltreDateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreDateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreDateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
