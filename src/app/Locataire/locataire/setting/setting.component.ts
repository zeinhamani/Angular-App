import { Router } from '@angular/router';
import { User } from './../../../models/user.model.ts';
import { LocataireComponent } from './../locataire.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor( private locataire: LocataireComponent, private mediaService: MediasService, private router: Router){}

  user!: User
  file!: any;
  
  ngOnInit(): void {
    this.user = this.locataire.currentUser
  }

 
  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }
  upload(){
   
          this.mediaService.addMedia(this.file,0,0,this.locataire.currentUser.id).subscribe(
            () => this.router.navigate(['Locataire'])
          )
    }
      
     
}
