import { EquipementsService } from './../../../services/equipements.service';
import { Equipement } from './../../../models/equipement.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { HabitatsService } from 'src/app/services/habitats.service';
import { Router } from '@angular/router';
import { ProprietaireComponent } from './../proprietaire.component';
import { Categorie } from './../../../models/categorie.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, FormArray} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-habitat',
  templateUrl: './add-habitat.component.html',
  styleUrls: ['./add-habitat.component.css']
})
export class AddHabitatComponent implements OnInit {

  addIcon = faPlus
  removIcon = faMinus
  categories!: Categorie[]  /*[{id:1 , nom: "yourte", habitats: [{id:2}], media: {id:0,fichier:''}} ]*/
  equipements!: Equipement[] /*= [{id: 1,nom:'Television'},{id: 2,nom:'Litterie'} ]*/
  addForm!: FormGroup ;
  user = `api/users/${this.prop.currentUser.id}`
  constructor(private formBuilder: FormBuilder, 
              private prop: ProprietaireComponent, 
              private habitatService: HabitatsService,
              private catService: CategoriesService ,
              private equipService: EquipementsService,
              private router: Router) { }
  ngOnInit(): void {
    this.getCategories()
    this.getEquipements()
    this.initForm()
  }
  initForm(){
    this.addForm = this.formBuilder.group({
      titre: ['', Validators.required],
      presentation: ['', Validators.required],
      adresse: ['', Validators.required],
      prix: ['', Validators.required],
      superficie: ['', Validators.required],
      capaciteAccueil: ['', Validators.required],
      dateOuvertureDu: ['', Validators.required],
      dateOuvertureAu: ['', Validators.required],
      fermetureExp: ['', Validators.required],
      heureArriveeDu: ['', Validators.required],
      heureArriveeAu: ['', Validators.required],
      heureDepartDu: ['', Validators.required],
      heureDepartAu: ['', Validators.required],
      categorie: this.formBuilder.array([]),
      equipements: ["", Validators.required],
      user: [this.user, Validators.required],
      destination: this.formBuilder.group({
        ville: ['', Validators.required],
        departement: ['', Validators.required],
        pays: ['', Validators.required]
      }),
      services: this.formBuilder.array([]),    
    })
  }
    get services() {
      return this.addForm.get('services') as FormArray
    }
    addService(){
      const  serviceForm = this.formBuilder.group({
        nom: ["", Validators.required],
        description: ["", Validators.required]
      })
       this.services.push(serviceForm)
    } 
    removeService(index: number){
      this.services.removeAt(index)
    }

    getCategories(){
      this.catService.getCatList().subscribe(
        (response) => this.categories = response["hydra:member"]
      )
    }
    getEquipements(){
      this.equipService.getEquipList().subscribe(
        (response) => this.equipements = response["hydra:member"]
      )
    }
   creerHabitat(){
    console.log(this.addForm.value)
     /*this.habitatService.addHabitat(this.addForm.value).subscribe(
      () => {
        this.router.navigate(['/prorietaire/mes-habitats'])
      }
     )*/

   } 
  

     
}
