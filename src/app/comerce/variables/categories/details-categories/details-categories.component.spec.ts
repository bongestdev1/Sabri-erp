import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCategoriesComponent } from './details-categories.component';

describe('DetailsCategoriesComponent', () => {
  let component: DetailsCategoriesComponent;
  let fixture: ComponentFixture<DetailsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
