import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotPasseOublierComponent } from './mot-passe-oublier.component';

describe('MotPasseOublierComponent', () => {
  let component: MotPasseOublierComponent;
  let fixture: ComponentFixture<MotPasseOublierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotPasseOublierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotPasseOublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
