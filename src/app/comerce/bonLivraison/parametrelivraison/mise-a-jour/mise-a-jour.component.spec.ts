import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseAJourComponent } from './mise-a-jour.component';

describe('MiseAJourComponent', () => {
  let component: MiseAJourComponent;
  let fixture: ComponentFixture<MiseAJourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseAJourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseAJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
