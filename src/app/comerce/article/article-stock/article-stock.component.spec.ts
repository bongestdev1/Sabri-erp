import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleStockComponent } from './article-stock.component';

describe('ArticleStockComponent', () => {
  let component: ArticleStockComponent;
  let fixture: ComponentFixture<ArticleStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
