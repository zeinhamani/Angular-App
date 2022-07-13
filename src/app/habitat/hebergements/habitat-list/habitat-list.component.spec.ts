import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatListComponent } from './habitat-list.component';

describe('HabitatListComponent', () => {
  let component: HabitatListComponent;
  let fixture: ComponentFixture<HabitatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
