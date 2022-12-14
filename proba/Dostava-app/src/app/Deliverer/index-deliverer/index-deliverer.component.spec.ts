import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDelivererComponent } from './index-deliverer.component';

describe('IndexDelivererComponent', () => {
  let component: IndexDelivererComponent;
  let fixture: ComponentFixture<IndexDelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
