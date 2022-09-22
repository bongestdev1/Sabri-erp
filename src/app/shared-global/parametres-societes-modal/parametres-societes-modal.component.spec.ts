import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresSocietesModalComponent } from './parametres-societes-modal.component';

describe('ParametresSocietesModalComponent', () => {
  let component: ParametresSocietesModalComponent;
  let fixture: ComponentFixture<ParametresSocietesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresSocietesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresSocietesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
