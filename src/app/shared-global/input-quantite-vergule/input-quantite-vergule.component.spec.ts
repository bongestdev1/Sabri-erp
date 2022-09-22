import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuantiteVerguleComponent } from './input-quantite-vergule.component';

describe('InputQuantiteVerguleComponent', () => {
  let component: InputQuantiteVerguleComponent;
  let fixture: ComponentFixture<InputQuantiteVerguleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuantiteVerguleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuantiteVerguleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
