import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresExercicesModalComponent } from './parametres-exercices-modal.component';

describe('ParametresExercicesModalComponent', () => {
  let component: ParametresExercicesModalComponent;
  let fixture: ComponentFixture<ParametresExercicesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresExercicesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresExercicesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
