import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesHabitatsComponent } from './mes-habitats.component';

describe('MesHabitatsComponent', () => {
  let component: MesHabitatsComponent;
  let fixture: ComponentFixture<MesHabitatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesHabitatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesHabitatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
