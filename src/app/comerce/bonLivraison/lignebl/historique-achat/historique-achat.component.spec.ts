import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAchatComponent } from './historique-achat.component';

describe('HistoriqueAchatComponent', () => {
  let component: HistoriqueAchatComponent;
  let fixture: ComponentFixture<HistoriqueAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
