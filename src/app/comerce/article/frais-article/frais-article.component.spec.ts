import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisArticleComponent } from './frais-article.component';

describe('FraisArticleComponent', () => {
  let component: FraisArticleComponent;
  let fixture: ComponentFixture<FraisArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraisArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
