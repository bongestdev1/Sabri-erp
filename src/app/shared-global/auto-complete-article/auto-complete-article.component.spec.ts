import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteArticleComponent } from './auto-complete-article.component';

describe('AutoCompleteArticleComponent', () => {
  let component: AutoCompleteArticleComponent;
  let fixture: ComponentFixture<AutoCompleteArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
