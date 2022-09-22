import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierlistparamComponent } from './modifierlistparam.component';

describe('ModifierlistparamComponent', () => {
  let component: ModifierlistparamComponent;
  let fixture: ComponentFixture<ModifierlistparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierlistparamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierlistparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
