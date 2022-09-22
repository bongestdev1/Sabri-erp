import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LignePrixSpecifiqueComponent } from './ligne-prix-specifique.component';

describe('LignePrixSpecifiqueComponent', () => {
  let component: LignePrixSpecifiqueComponent;
  let fixture: ComponentFixture<LignePrixSpecifiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LignePrixSpecifiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LignePrixSpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
