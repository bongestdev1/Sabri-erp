import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHtmlComponent } from './client-html.component';

describe('ClientHtmlComponent', () => {
  let component: ClientHtmlComponent;
  let fixture: ComponentFixture<ClientHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
