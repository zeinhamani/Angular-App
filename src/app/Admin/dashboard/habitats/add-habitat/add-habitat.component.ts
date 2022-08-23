import { DashboardComponent } from './../../dashboard.component';
import { HabitatsService } from 'src/app/services/habitats.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, FormArray} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from 'src/app/models/categorie.model.ts';
import { Equipement } from 'src/app/models/equipement.model.ts';
import { EquipementsService } from 'src/app/services/equipements.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFileImage} from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MediasService } from 'src/app/services/medias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-habitat',
  templateUrl: './add-habitat.component.html',
  styleUrls: ['./add-habitat.component.css']
})
export class AddHabitatComponent implements OnInit {

  user = `api/users/${this.admin.currentUser.id}`
  addIcon = faPlus
  removIcon = faMinus
  imageIcon = faFileImage
  categories!: Categorie[]  /*[{id:1 , nom: "yourte", habitats: [{id:2}], media: {id:0,fichier:''}} ]*/
  equipements!: Equipement[] /*= [{id: 1,nom:'Television'},{id: 2,nom:'Litterie'} ]*/
  addForm!: FormGroup ;
  selectedMedias!: any[]
  urls!: any[]
  dropdownList1!: any[]
  dropdownList2!: any[]
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings1!:IDropdownSettings;  
  dropdownSettings2!:IDropdownSettings;
  constructor(private formBuilder: FormBuilder, 
              private admin: DashboardComponent , 
              private habitatService: HabitatsService,
              private catService: CategoriesService ,
              private equipService: EquipementsService,
              private mediaService: MediasService,
              private toastr: ToastrService,
              private router: Router) { }
  ngOnInit(): void {
    this.dropdownSettings1 = {
      singleSelection: true,
      allowRemoteDataSearch: true,
      idField: 'id_cat',
      textField: 'nom_cat',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      allowRemoteDataSearch: true,
      idField: 'id_equip',
      textField: 'nom_equip',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
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
      categorie: ['', Validators.required],
      equipement: ['', Validators.required],
      user: [this.user, Validators.required],
      destination: this.formBuilder.group({
        ville: ['', Validators.required],
        departement: ['', Validators.required],
        pays: ['', Validators.required]
      }),
      services: this.formBuilder.array([]),    
    })
    
    this.getCategories()
    this.getEquipements()
    
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
        (response) =>{
          let tmp = []
          this.categories = response["hydra:member"]
          for(let equip of this.categories) {
            const id = equip.id
            const nom = equip.nom
            const elem = {id_cat:id,nom_cat:nom}
            tmp.push(elem)
          }
          this.dropdownList1 = tmp
        } 
      )
    }
    getEquipements(){
      this.equipService.getEquipList().subscribe(
        (response) => { 
          let tmp = []
          this.equipements = response["hydra:member"]
          console.log(this.equipements)
          for(let equip of this.equipements) {
            const id = equip.id
            const nom = equip.nom
            const elem = {id_equip:id,nom_equip:nom}
            tmp.push(elem)
          }
          this.dropdownList2 = tmp
  
          
        })
    }
    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
   
   handleMediaInput($event: any){
    const files = $event.target.files
    let isImage = true;
    
    for(let i=0; i<files.length; i++){
    
      if(files.item(i).type.match('image.*')){
        continue
      } else {
        isImage = false;
        alert('format invalide :)')
        break
      }
    }
    if(isImage){
        this.selectedMedias = $event.target.files
    } 
  }
  getEquipId(equips:any){
    let ids = []
    for(let equip of equips){
      ids.push(`api/equipements/${equip.id_equip}`)
    }
    return ids
  }
  creerHabitat(){
   const form = this.addForm.value
    var body = {
      titre: form.titre,
      presentation: form.presentation,
      adresse: form.adresse,
      prix: form.prix,
      superficie: form.superficie, 
      capaciteAccueil:form.capaciteAccueil, 
      dateOuvertureDu: form.dateOuvertureDu, 
      dateOuvertureAu: form.dateOuvertureAu,
      fermetureExp: form.fermetureExp,
      heureArriveeDu:form.heureArriveeDu, 
      heureArriveeAu: form.heureArriveeAu,
      heureDepartDu: form.heureDepartDu,
      heureDepartAu: form.heureDepartAu,
      categorie: `api/categories/${form.categorie[0].id_cat}`,
      equipements: this.getEquipId(form.equipement),
      user: this.user,
      destination: {  
        ville: form.destination.ville,
        departement:form.destination.departement, 
        pays: form.destination.pays}
      ,
      services:  form.services
    
    }
    console.log(body)
     this.habitatService.addHabitat(body).subscribe(
      (response) => {
        for(let media of this.selectedMedias) {
          this.mediaService.addMedia(media,0,response.id).subscribe()
        }
        this.router.navigate(['proprietaire/mes-habitats'])
        this.toastr.success('Habitat est crée', 'Bien enregistrer')
      },
      (error)=> {
        this.toastr.error(error,"Un probleme survenue")
      }
     )
     

   } 

}
