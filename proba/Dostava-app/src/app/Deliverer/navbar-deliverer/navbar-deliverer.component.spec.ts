import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDelivererComponent } from './navbar-deliverer.component';

describe('NavbarDelivererComponent', () => {
  let component: NavbarDelivererComponent;
  let fixture: ComponentFixture<NavbarDelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
