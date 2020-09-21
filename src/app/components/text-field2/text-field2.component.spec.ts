import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextField2Component } from './text-field2.component';

describe('TextField2Component', () => {
  let component: TextField2Component;
  let fixture: ComponentFixture<TextField2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextField2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextField2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
