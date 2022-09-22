import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChauffeurCommerceComponent } from './ajout-chauffeur-commerce.component';

describe('AjoutChauffeurCommerceComponent', () => {
  let component: AjoutChauffeurCommerceComponent;
  let fixture: ComponentFixture<AjoutChauffeurCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutChauffeurCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChauffeurCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
