import { Habitat } from 'src/app/models/habitat.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie.model.ts';
import { Equipement } from 'src/app/models/equipement.model.ts';
import { HabitatsService } from 'src/app/services/habitats.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { EquipementsService } from 'src/app/services/equipements.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-habitat',
  templateUrl: './edit-habitat.component.html',
  styleUrls: ['./edit-habitat.component.css']
})
export class EditHabitatComponent implements OnInit {

  habitat!: Habitat
  categories!: Categorie[]  
  equipements!: Equipement[] 
  addForm!: FormGroup ;
  constructor(private formBuilder: FormBuilder,  
              private habitatService: HabitatsService,
              private catService: CategoriesService ,
              private equipService: EquipementsService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCategories()
    this.getEquipements()
    this.initForm()
  }
  initForm(){
    const habitatId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(habitatId) {
      this.habitatService.getHabitatItem(+habitatId).subscribe(
        (response) => { 
          this.habitat = response 
          const categorie = `api/categories/${this.habitat.categorie.id}`
          this.addForm = this.formBuilder.group({
            titre: [response["titre"], Validators.required],
            presentation: [response["presentation"], Validators.required],
            adresse: [response["adresse"], Validators.required],
            prix: [response["prix"], Validators.required],
            superficie: [response["superficie"], Validators.required],
            capaciteAccueil: [response["capaciteAccueil"], Validators.required],
            dateOuvertureDu: [response["dateOuvertureDu"], Validators.required],
            dateOuvertureAu: [response["dateOuvertureAu"], Validators.required],
            fermetureExp: [response["fermetureExp"], Validators.required],
            heureArriveeDu: [response["heureArriveeDu"], Validators.required],
            heureArriveeAu: [response["heureArriveeAu"], Validators.required],
            heureDepartDu: [response["heureDepartDu"], Validators.required],
            heureDepartAu: [response["heureDepartAu"], Validators.required],
            categorie: [categorie, Validators.required],
            equipements: ['', Validators.required],
            destination: this.formBuilder.group({
              ville: [response["destination"].ville, Validators.required],
              departement: [response["destination"].departement, Validators.required],
              pays: [response["destination"].pays, Validators.required]
            }),
            services: this.formBuilder.array([]),    
          })
          let serviceFormGroups = this.habitat.services.map(service => this.formBuilder.group(service));
          let serviceFormArray = this.formBuilder.array(serviceFormGroups);
          this.addForm.setControl('services', serviceFormArray); 
        } 
        )}
    
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
    getHabitat(){
      const habitatId: string | null = this.activeRoute.snapshot.paramMap.get('id')
      if(habitatId) {
        this.habitatService.getHabitatItem(+habitatId).subscribe(
          (response) => this.habitat = response
          )}
    }
   editHabitat(){
    console.log(this.addForm.value)
     this.habitatService.updatedHabitat(this.habitat.id,this.addForm.value).subscribe(
        () => console.log("Done")
        )
   } 

}
