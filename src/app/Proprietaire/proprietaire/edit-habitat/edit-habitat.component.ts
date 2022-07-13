import { Habitat } from './../../../models/habitat.model.ts';
import { EquipementsService } from './../../../services/equipements.service';
import { Equipement } from './../../../models/equipement.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { HabitatsService } from 'src/app/services/habitats.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProprietaireComponent } from './../proprietaire.component';
import { Categorie } from './../../../models/categorie.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, FormArray} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-habitat',
  templateUrl: './edit-habitat.component.html',
  styleUrls: ['./edit-habitat.component.css']
})
export class EditHabitatComponent implements OnInit {

  addIcon = faPlus
  removIcon = faMinus
  habitat!: Habitat /* {id:1,titre:'fd',adresse:'',
         capaciteAccueil:2,prix:23,superficie:3,fermetureExp:'efd',
         dateOuvertureAu:'14/05/2020',dateOuvertureDu:'14/05/2020',heureArriveeAu:'sxé',heureArriveeDu:'00:34',heureDepartDu:'dss',
        heureDepartAu:'fvfdf', categorie:{id:1,nom:'fsdsaz',habitats:[{id:3}], media:{id:5,fichier:'ds'}},services:[{id:3,nom:'ds',
        description:'qdxc'}], equipements:[{id:8,nom:'gdcd'}], user: {id:2,nom:'fdd',email:'fd',roles:'fdd',password:''
        ,reservations:[{id:3}],media:{id:5,fichier:'ds'},habitats:[{id:1}]},destination: {id:3,ville:'ds',departement:45323
      , pays:'dsd'}, presentation:'fdd',medias:[{id:5,fichier:'ds'}]
        }*/
  categories!: Categorie[]  
  equipements!: Equipement[] 
  addForm!: FormGroup ;
  Habitatservice = {}
  user = `api/users/${this.prop.currentUser.id}`
  constructor(private formBuilder: FormBuilder, 
              private prop: ProprietaireComponent, 
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
            user: [this.user, Validators.required],
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
