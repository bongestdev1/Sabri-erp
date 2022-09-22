import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneblComponent } from './lignebl.component';

describe('LigneblComponent', () => {
  let component: LigneblComponent;
  let fixture: ComponentFixture<LigneblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
