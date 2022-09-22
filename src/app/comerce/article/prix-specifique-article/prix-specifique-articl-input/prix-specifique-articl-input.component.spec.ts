import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixSpecifiqueArticlInputComponent } from './prix-specifique-articl-input.component';

describe('PrixSpecifiqueArticlInputComponent', () => {
  let component: PrixSpecifiqueArticlInputComponent;
  let fixture: ComponentFixture<PrixSpecifiqueArticlInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrixSpecifiqueArticlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixSpecifiqueArticlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
