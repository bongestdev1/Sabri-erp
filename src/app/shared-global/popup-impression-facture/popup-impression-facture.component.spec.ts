import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImpressionFactureComponent } from './popup-impression-facture.component';

describe('PopupImpressionFactureComponent', () => {
  let component: PopupImpressionFactureComponent;
  let fixture: ComponentFixture<PopupImpressionFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupImpressionFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupImpressionFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
