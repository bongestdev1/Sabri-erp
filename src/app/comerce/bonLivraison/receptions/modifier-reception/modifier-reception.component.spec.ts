import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReceptionComponent } from './modifier-reception.component';

describe('ModifierReceptionComponent', () => {
  let component: ModifierReceptionComponent;
  let fixture: ComponentFixture<ModifierReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
