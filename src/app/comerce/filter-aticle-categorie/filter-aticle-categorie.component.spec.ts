import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAticleCategorieComponent } from './filter-aticle-categorie.component';

describe('FilterAticleCategorieComponent', () => {
  let component: FilterAticleCategorieComponent;
  let fixture: ComponentFixture<FilterAticleCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAticleCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAticleCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
