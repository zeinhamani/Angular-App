import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLocataireComponent } from './sign-up-locataire.component';

describe('SignUpLocataireComponent', () => {
  let component: SignUpLocataireComponent;
  let fixture: ComponentFixture<SignUpLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpLocataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
