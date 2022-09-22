import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementDetailsComponent } from './reglement-details.component';

describe('ReglementDetailsComponent', () => {
  let component: ReglementDetailsComponent;
  let fixture: ComponentFixture<ReglementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
