import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesTransfertDocumentsComponent } from './routes-transfert-documents.component';

describe('RoutesTransfertDocumentsComponent', () => {
  let component: RoutesTransfertDocumentsComponent;
  let fixture: ComponentFixture<RoutesTransfertDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesTransfertDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesTransfertDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
