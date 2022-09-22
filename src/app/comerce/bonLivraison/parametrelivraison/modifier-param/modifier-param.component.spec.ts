import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierParamComponent } from './modifier-param.component';

describe('ModifierParamComponent', () => {
  let component: ModifierParamComponent;
  let fixture: ComponentFixture<ModifierParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
