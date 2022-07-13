import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatItemComponent } from './habitat-item.component';

describe('HabitatItemComponent', () => {
  let component: HabitatItemComponent;
  let fixture: ComponentFixture<HabitatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitatItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
