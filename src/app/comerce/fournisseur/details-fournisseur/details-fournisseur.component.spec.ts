import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFournisseurComponent } from './details-fournisseur.component';

describe('DetailsFournisseurComponent', () => {
  let component: DetailsFournisseurComponent;
  let fixture: ComponentFixture<DetailsFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
