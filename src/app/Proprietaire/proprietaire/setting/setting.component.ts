import { ProprietaireComponent } from './../proprietaire.component';
import { Component, OnInit } from '@angular/core';
import { MediasService } from 'src/app/services/medias.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model.ts';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comparePasswords } from 'src/app/shared/password.validator';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private userService: UsersService, 
              private prop: ProprietaireComponent, 
              private mediaService: MediasService, 
              private toastr: ToastrService,
              private router: Router){}


  userForm!: FormGroup ;
  userImage = 'assets/user.png'
  serverUrl = environment.SERVER_URL
  edit = faEdit
  user!: User
  file!: any;
  toggler = false
  toggler1 = false
  toggler2 = false
  toggler3 = false
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  telPtn = '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/'
  
  ngOnInit(): void {
    this.initForm()
  }
  get nom() {
    return this.userForm .get('nom')
  }
 
  get tel() {
    return this.userForm .get('tel')
  }
  get password() {
    return this.userForm .get('passwords')?.get('password')
  }
  get confirmedPassword(){
    return this.userForm .get('passwords')?.get('confirmed_password')
  }
  initForm(){
    this.user = this.prop.currentUser
    this.userImage = this.serverUrl + this.user.media.url
    this.userForm = this.formBuilder.group({
      nom: [this.user.nom, [Validators.required,Validators.minLength(3)]],
      tel: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: [, [Validators.required, Validators.minLength(8)]],
        confirmed_password: ['', [Validators.required]],
      },{validators: comparePasswords}),
        
    })
  }
 
  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }
  upload(){
   
          this.mediaService.addMedia(this.file,0,0,this.user.id).subscribe(
            () => this.router.navigate(['proprietaire'])
          )
  }
  saveUserData(){
     const form = this.userForm.value
      var body = {
           nom: form.nom,
           tel: form.tel,
           //password: form.passwords.password
      }
      this.userService.updatedUser(this.user.id, body).subscribe(
        (response) => {
          if(response) {
            this.toastr.success('Un nouveau utilisateur créer!', 'Bien enregistré!')
            this.router.navigate(['proprietaire']);
          } 
        }, (error) => {
          this.toastr.error(error,"l'inscription échouée")
        }
      )
  }

  Toggle() {
    this.toggler = !this.toggler; 
  }
    Toggle1() {
      this.toggler1 = !this.toggler1; 
    }
    Toggle2() {
      this.toggler2 = !this.toggler2; 
    }
    Toggle3() {
      this.toggler3 = !this.toggler3; 
    }

}
