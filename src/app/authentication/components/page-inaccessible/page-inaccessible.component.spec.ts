import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInaccessibleComponent } from './page-inaccessible.component';

describe('PageInaccessibleComponent', () => {
  let component: PageInaccessibleComponent;
  let fixture: ComponentFixture<PageInaccessibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInaccessibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInaccessibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
