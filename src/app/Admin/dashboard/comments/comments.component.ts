import { Component, OnInit } from '@angular/core';
import { Commentaire } from 'src/app/models/commentaire.model.ts';
import { CommentairesService } from 'src/app/services/commentaires.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments!: Commentaire[]
  constructor(private commentS: CommentairesService) { }

  ngOnInit(): void {
    //this.comments = this.commentS.commentaires
  }

}
