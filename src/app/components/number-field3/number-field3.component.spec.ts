import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberField3Component } from './number-field3.component';

describe('NumberField3Component', () => {
  let component: NumberField3Component;
  let fixture: ComponentFixture<NumberField3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberField3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberField3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
