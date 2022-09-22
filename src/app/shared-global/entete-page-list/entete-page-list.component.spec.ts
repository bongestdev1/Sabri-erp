import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePageListComponent } from './entete-page-list.component';

describe('EntetePageListComponent', () => {
  let component: EntetePageListComponent;
  let fixture: ComponentFixture<EntetePageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
