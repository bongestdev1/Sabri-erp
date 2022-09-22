import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementInputComponent } from './reglement-input.component';

describe('ReglementInputComponent', () => {
  let component: ReglementInputComponent;
  let fixture: ComponentFixture<ReglementInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
