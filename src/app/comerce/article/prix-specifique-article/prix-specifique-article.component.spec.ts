import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixSpecifiqueArticleComponent } from './prix-specifique-article.component';

describe('PrixSpecifiqueArticleComponent', () => {
  let component: PrixSpecifiqueArticleComponent;
  let fixture: ComponentFixture<PrixSpecifiqueArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrixSpecifiqueArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixSpecifiqueArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
