import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaReservationComponent } from './ma-reservation.component';

describe('MaReservationComponent', () => {
  let component: MaReservationComponent;
  let fixture: ComponentFixture<MaReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
