import { Router } from '@angular/router';
import { HabitatsService } from 'src/app/services/habitats.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitatList } from 'src/app/models/habitatList.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  serverUrl = environment.SERVER_URL
  signupForm!: FormGroup ;
  habitats!: HabitatList[];
  constructor(private formBuilder: FormBuilder,private habitatService: HabitatsService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(){
    this.signupForm = this.formBuilder.group({
      mot_cle: ['', Validators.required]   
    })
  }
  rechercher() {
    console.log(this.signupForm.value)
     this.habitatService.searchByTitle(this.signupForm.get('mot_cle')?.value).subscribe(
      (habitats) => this.habitats = habitats["hydra:member"]
     ) 
  }
  voirHabitat(habitatId: number) {
    this.router.navigate(['/habitats', habitatId])
}

}
