import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderANDfooterPDFComponent } from './header-andfooter-pdf.component';

describe('HeaderANDfooterPDFComponent', () => {
  let component: HeaderANDfooterPDFComponent;
  let fixture: ComponentFixture<HeaderANDfooterPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderANDfooterPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderANDfooterPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
