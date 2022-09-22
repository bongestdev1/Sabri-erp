import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVariantesComponent } from './article-variantes.component';

describe('ArticleVariantesComponent', () => {
  let component: ArticleVariantesComponent;
  let fixture: ComponentFixture<ArticleVariantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleVariantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleVariantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
