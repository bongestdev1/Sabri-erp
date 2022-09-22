import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementClientComponent } from './classement-client.component';

describe('ClassementClientComponent', () => {
  let component: ClassementClientComponent;
  let fixture: ComponentFixture<ClassementClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
