import { MapToIterable } from './../../../pipes';
import { ActivatedRoute } from '@angular/router';
import { CommentairesService } from './../../../services/commentaires.service';
import { Commentaire } from './../../../models/commentaire.model.ts';
import { HabitatsService } from './../../../services/habitats.service';
import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habitat-item',
  templateUrl: './habitat-item.component.html',
  styleUrls: ['./habitat-item.component.css']
})
export class HabitatItemComponent implements OnInit {

  habitat!: Habitat  ;
  faUsers = faUsers;
  commentaires: Commentaire[]=[]
  serverUrl = environment.SERVER_URL
  image!: string  ;
  images: string[]=[];
  counter: number = 0;
  d!: string
  constructor(private habitatService: HabitatsService, private commService: CommentairesService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const habitatId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(habitatId) {
      this.habitatService.getHabitatItem(+habitatId).subscribe(
          (response) => {
            this.habitat = response
            this.recuperImages();
            this.d = this.habitat.dateOuvertureAu
            console.log(this.getDate(this.d))
            console.log(this.getTime(this.habitat.heureArriveeAu))
            this.image = this.habitat.medias[0].url 
          }
      )
    }
  
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
  getDate(d:string) {
      const dateTime = new Date(d)
      const date = dateTime.getFullYear()+'/'+(dateTime.getMonth()+1)+'/'+dateTime.getDate();
      return date;
  }
  getTime(d:string){
    const dateTime = new Date(d)
    const time = dateTime.getHours()+':'+dateTime.getMinutes()
    return time
  }
  recuperImages(){
    for(let i=0; i < this.habitat.medias.length; i++){
      this.images.push(this.habitat.medias[i].url)
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

