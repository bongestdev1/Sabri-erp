import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixSpecifiqueArticlesListComponent } from './prix-specifique-articles-list.component';

describe('PrixSpecifiqueArticlesListComponent', () => {
  let component: PrixSpecifiqueArticlesListComponent;
  let fixture: ComponentFixture<PrixSpecifiqueArticlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrixSpecifiqueArticlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixSpecifiqueArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
