import { Habitat } from './../../../models/habitat.model.ts';
import { EquipementsService } from './../../../services/equipements.service';
import { Equipement } from './../../../models/equipement.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faFileImage} from '@fortawesome/free-solid-svg-icons';
import { HabitatsService } from 'src/app/services/habitats.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProprietaireComponent } from './../proprietaire.component';
import { Categorie } from './../../../models/categorie.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, FormArray} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-habitat',
  templateUrl: './edit-habitat.component.html',
  styleUrls: ['./edit-habitat.component.css']
})
export class EditHabitatComponent implements OnInit {

  addIcon = faPlus
  removIcon = faMinus
  imageIcon = faFileImage
  habitat!: Habitat 
  serverUrl = environment.SERVER_URL
  categories!: Categorie[]  
  equipements!: Equipement[] 
  addForm!: FormGroup ;
  Habitatservice = {}
  selectedMedias!: any[]
  toggler = false
  dropdownList1!: any[]
  dropdownList2!: any[]
  selectedItems1:any[]=[] ;
  selectedItems2:any[] = [];
  dropdownSettings1!:IDropdownSettings;
  dropdownSettings2!:IDropdownSettings;
  
  user = `api/users/${this.prop.currentUser.id}`
  constructor(private formBuilder: FormBuilder, 
              private prop: ProprietaireComponent, 
              private habitatService: HabitatsService,
              private catService: CategoriesService ,
              private equipService: EquipementsService,
              private router: Router,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute) { }
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
          this.selectedItems1.push({id_cat:this.habitat.categorie.id,nom_cat:this.habitat.categorie.nom})
          for(let  eq of this.habitat.equipements){
             let id = eq['id']
             let nom = eq['nom']
             this.selectedItems2.push({id_equip:id,nom_equip:nom})
          }
          this.addForm = this.formBuilder.group({
            titre: [response["titre"], Validators.required],
            presentation: [response["presentation"], Validators.required],
            adresse: [response["adresse"], Validators.required],
            prix: [response["prix"], Validators.required],
            superficie: [response["superficie"], Validators.required],
            capaciteAccueil: [response["capaciteAccueil"], Validators.required],
            dateOuvertureDu: [this.getDate(this.habitat.dateOuvertureDu), Validators.required],
            dateOuvertureAu: [this.getDate(this.habitat.dateOuvertureAu), Validators.required],
            fermetureExp: [response["fermetureExp"], Validators.required],
            heureArriveeDu: [this.getTime(this.habitat.heureArriveeDu), Validators.required],
            heureArriveeAu: [this.getTime(this.habitat.heureArriveeAu), Validators.required],
            heureDepartDu: [this.getTime(this.habitat.heureDepartDu), Validators.required],
            heureDepartAu: [this.getTime(this.habitat.heureDepartAu), Validators.required],
            categorie: ['', Validators.required],
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
      let isImage = true
      
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
   editHabitat(){
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
      equipements: this.getEquipId(form.equipements),
      user: this.user,
      destination: {  
        ville: form.destination.ville,
        departement:form.destination.departement, 
        pays: form.destination.pays}
      ,
      services:  form.services
    
    }
    console.log(this.addForm.value)
    console.log(body)
    console.log(this.addForm.value)
     this.habitatService.updatedHabitat(this.habitat.id,body).subscribe(
        () => {
          this.router.navigate(['proprietaire/mes-habitats'])
          this.toastr.success('Habitat est bien modifier', 'Bien enregistrer')
        },
        (err) => {
          this.toastr.error(err,"Un probleme survenue")
        }
        )
   } 

   getDate(d:string) {
    const dateTime = new Date(d)
    const date = +dateTime.getDate()+'/'+(dateTime.getMonth()+1)+'/'+dateTime.getFullYear();
    return date;
   }
  getTime(d:string){
  const dateTime = new Date(d)
  const time = dateTime.getHours()+':'+dateTime.getMinutes()
  return time
  }
  
  menuToggle() {
    this.toggler = !this.toggler; 
   }
}

