import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresPageComponent } from './parametres-page.component';

describe('ParametresPageComponent', () => {
  let component: ParametresPageComponent;
  let fixture: ComponentFixture<ParametresPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
