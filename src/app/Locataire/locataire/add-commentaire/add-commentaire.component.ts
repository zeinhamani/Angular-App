import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.css']
})
export class AddCommentaireComponent implements OnInit {

  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder) { }

 
  ngOnInit(): void {
      this.initForm()
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      comment: ['', Validators.required]
  })
  }

  publier(){}
}
