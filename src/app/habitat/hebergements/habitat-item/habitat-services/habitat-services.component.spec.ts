import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatServicesComponent } from './habitat-services.component';

describe('HabitatServicesComponent', () => {
  let component: HabitatServicesComponent;
  let fixture: ComponentFixture<HabitatServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitatServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitatServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
