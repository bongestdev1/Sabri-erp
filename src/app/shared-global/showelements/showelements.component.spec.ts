import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowelementsComponent } from './showelements.component';

describe('ShowelementsComponent', () => {
  let component: ShowelementsComponent;
  let fixture: ComponentFixture<ShowelementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowelementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
