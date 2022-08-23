import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-contactez-nous',
  templateUrl: './contactez-nous.component.html',
  styleUrls: ['./contactez-nous.component.css']
})
export class ContactezNousComponent implements OnInit {

  contactForm!: FormGroup
  
  dropdownList!: any[];
 
  constructor(private formBuilder: FormBuilder, private notifService: NotificationsService){}
 
  ngOnInit(): void {
    this.initForm();

  }

  get nom() {
    return this.contactForm.get('nom')
  }
  get email() {
    return this.contactForm.get('email')
  }
  get message() {
    return this.contactForm.get('message')
  }
  get objet() {
    return this.contactForm.get('objet')
  }
 
  initForm(){
    this.contactForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      objet: ['', [Validators.required,Validators.minLength(10)]],
      message: ['', [Validators.required,Validators.minLength(50)]],    
    })
  
  }
  
 
  Envoyer(){
       const form = this.contactForm.value
      var body = {
        content: this.contactForm.value.content,
        user: `api/users/${form.user[0].id}`
      }
       this.notifService.addNOTIF(body).subscribe(
        () => console.log('done')
       )
  }


}
