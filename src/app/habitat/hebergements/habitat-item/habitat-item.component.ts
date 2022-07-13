import { MapToIterable } from './../../../pipes';
import { ActivatedRoute } from '@angular/router';
import { CommentairesService } from './../../../services/commentaires.service';
import { Commentaire } from './../../../models/commentaire.model.ts';
import { HabitatsService } from './../../../services/habitats.service';
import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habitat-item',
  templateUrl: './habitat-item.component.html',
  styleUrls: ['./habitat-item.component.css']
})
export class HabitatItemComponent implements OnInit {

  habitat!: Habitat  ;
  faUsers = faUsers;
  commentaires: Commentaire[]=[]
  image!: string  ;
  images: string[]=[];
  counter: number = 0;
  titre!: string
  presentation!: string
  adresse!: string
  prix!: number  
  superficie!: number
  capaciteAccueil!: number
  dateOuvertureDu!: string
  dateOuvertureAu!: string
  fermetureExp!: string
  heureArriveeDu!: string
  heureArriveeAu!: string 
  heureDepartDu!: string
  heureDepartAu!: string 
  categorieNom!: string
  ville!: string
  departement!: string
  pays!: string
  services!: any[]
  equipements!: any[]
  constructor(private habitatService: HabitatsService, private commService: CommentairesService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const habitatId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(habitatId) {
      this.habitatService.getHabitatItem(+habitatId).subscribe(
          (response) => {
            this.habitat = response
            this.titre = response["titre"]
            this.presentation = response["presentation"]
            this.adresse = response["adresse"]
            this.prix = response["prix"]
            this.superficie = response["superficie"]
            this.capaciteAccueil = response["capaciteAccueil"]
            this.dateOuvertureDu = response["dateOuvertureDu"]
            this.dateOuvertureAu = response["dateOuvertureAu"]
            this.fermetureExp = response["fermetureExp"]
            this.heureArriveeDu = response["heureArriveeDu"]
            this.heureArriveeAu = response["heureArriveeAu"]
            this.heureDepartDu = response["heureDepartDu"]
            this.heureDepartAu = response["heureDepartAu"]
           this.categorieNom = response["categorie"].nom
            this.ville = response["destination"].ville
            this.departement = response["destination"].departement
            this.pays = response["destination"].pays
            this.services = response["services"]
            this.equipements = response["equipements"]
             /*this.habitat.titre = response["titre"]
            this.habitat.adresse = response["adresse"]
            this.habitat.prix = response["prix"]
            this.habitat.superficie = response["superficie"]
            this.habitat.capaciteAccueil = response["capaciteAccueil"]
            this.habitat.dateOuvertureDu = response["dateOuvertureDu"]
            this.habitat.dateOuvertureAu = response["dateOuvertureAu"]
            this.habitat.fermetureExp = response["fermetureExp"]
            this.habitat.heureArriveeDu = response["heureArriveeDu"]
            this.habitat.heureArriveeAu = response["heureArriveeAu"]
            this.habitat.heureDepartDu = response["heureDepartDu"]
            this.habitat.heureDepartAu = response["heureDepartAu"]
           this.habitat.categorie.nom = response["categorie"].nom
            this.habitat.destination.ville = response["destination"].ville
            this.habitat.destination.departement = response["destination"].departement
            this.habitat.destination.pays = response["destination"].pays*/
          }
      )
    }
   /*  this.recupereCommentaires()
    this.recuperImages();
    this.image = this.habitat!.medias[0].fichier */
  }  

  /** recuperer les commentaires de l'habitat *
  recupereCommentaires(){
        for(let commentaire of this.commService.commentaires ){
          if(commentaire.reservation.habitat === this.habitat){
            this.commentaires.push(commentaire);
          }
        } 
  }
  /** recuperer les images de l'habitat */
  recuperImages(){
    for(let i=0; i < this.habitat.medias.length; i++){
      this.images.push(this.habitat.medias[i].fichier)
  }
  }
  defilerGauche(){
    this.counter++;
    if(this.counter === this.images.length ) {
        this.counter = 0
    } 
    this.image = this.images[this.counter]; 
    
  }
  defilerDroit() {
    this.counter--;
    if(this.counter === -1 ) {
      this.counter = this.images.length - 1;
    } 
  this.image = this.images[this.counter];
}
}

