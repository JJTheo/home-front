import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoCoordinateComponent } from './geo-coordinate.component';

describe('GeoCoordinateComponent', () => {
  let component: GeoCoordinateComponent;
  let fixture: ComponentFixture<GeoCoordinateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoCoordinateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoCoordinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
