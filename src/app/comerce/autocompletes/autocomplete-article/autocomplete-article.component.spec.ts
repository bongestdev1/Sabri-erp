import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteArticleComponent } from './autocomplete-article.component';

describe('AutocompleteArticleComponent', () => {
  let component: AutocompleteArticleComponent;
  let fixture: ComponentFixture<AutocompleteArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
