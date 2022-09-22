import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteAdminComponent } from './societe-admin.component';

describe('SocieteAdminComponent', () => {
  let component: SocieteAdminComponent;
  let fixture: ComponentFixture<SocieteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
