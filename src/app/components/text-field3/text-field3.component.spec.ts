import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextField3Component } from './text-field3.component';

describe('TextField3Component', () => {
  let component: TextField3Component;
  let fixture: ComponentFixture<TextField3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextField3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextField3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
