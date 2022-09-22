import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReglementComponent } from './details-reglement.component';

describe('DetailsReglementComponent', () => {
  let component: DetailsReglementComponent;
  let fixture: ComponentFixture<DetailsReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
