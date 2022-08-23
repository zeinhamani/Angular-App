import { CommentairesService } from './../../../../services/commentaires.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Commentaire } from 'src/app/models/commentaire.model.ts';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit, OnChanges {

  @Input()
  commentaires!: Commentaire[];
  commentairesList!: Commentaire[]
  faStar = faStar;
  stars!: number[]
  serverUrl = environment.SERVER_URL
  
  constructor(private commService: CommentairesService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHabitatcommts()
  }
  getHabitatcommts(){
    const habitatId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(habitatId){
      this.commService.getComntList().subscribe(
        (res) => {
           this.commentairesList = res["hydra:member"]
           for( let comment of this.commentairesList){
                if(comment.reservation.habitat.id === +habitatId ){
                          this.commentaires.push(comment)
                          
                }
           }
        }
      )
    }
  
  }
  numTable(num: number){
       const table = []
       for(let i=0;i<num; i++){
        table.push(i)
       }
       return table
  }
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
  ngOnChanges(changes: SimpleChanges): void {
           
  }
}
