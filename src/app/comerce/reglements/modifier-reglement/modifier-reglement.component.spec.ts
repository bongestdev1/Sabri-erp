import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReglementComponent } from './modifier-reglement.component';

describe('ModifierReglementComponent', () => {
  let component: ModifierReglementComponent;
  let fixture: ComponentFixture<ModifierReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
