import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreListPageComponent } from './nombre-list-page.component';

describe('NombreListPageComponent', () => {
  let component: NombreListPageComponent;
  let fixture: ComponentFixture<NombreListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
