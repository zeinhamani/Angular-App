import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitatComponent } from './edit-habitat.component';

describe('EditHabitatComponent', () => {
  let component: EditHabitatComponent;
  let fixture: ComponentFixture<EditHabitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHabitatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHabitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
