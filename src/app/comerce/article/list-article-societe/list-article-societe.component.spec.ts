import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleSocieteComponent } from './list-article-societe.component';

describe('ListArticleSocieteComponent', () => {
  let component: ListArticleSocieteComponent;
  let fixture: ComponentFixture<ListArticleSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
