import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreAdresseComponent } from './autre-adresse.component';

describe('AutreAdresseComponent', () => {
  let component: AutreAdresseComponent;
  let fixture: ComponentFixture<AutreAdresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutreAdresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
