import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpProprietaireComponent } from './sign-up-proprietaire.component';

describe('SignUpProprietaireComponent', () => {
  let component: SignUpProprietaireComponent;
  let fixture: ComponentFixture<SignUpProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
