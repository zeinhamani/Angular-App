import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Commentaire } from 'src/app/models/commentaire.model.ts';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit, OnChanges {

  @Input()
  commentaires!: Commentaire[];
  faStar = faStar;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
           
  }
}
