import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAcceptOrderComponent } from './map-accept-order.component';

describe('MapAcceptOrderComponent', () => {
  let component: MapAcceptOrderComponent;
  let fixture: ComponentFixture<MapAcceptOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAcceptOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAcceptOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
