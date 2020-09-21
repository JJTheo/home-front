import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberField2Component } from './number-field2.component';

describe('NumberField2Component', () => {
  let component: NumberField2Component;
  let fixture: ComponentFixture<NumberField2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberField2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberField2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
