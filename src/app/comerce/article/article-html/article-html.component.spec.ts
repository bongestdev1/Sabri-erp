import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHtmlComponent } from './article-html.component';

describe('ArticleHtmlComponent', () => {
  let component: ArticleHtmlComponent;
  let fixture: ComponentFixture<ArticleHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
