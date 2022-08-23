import { Commentaire } from './../../../models/commentaire.model.ts';
import { CommentairesService } from './../../../services/commentaires.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.css']
})
export class AddCommentaireComponent implements OnInit {

  commentaireForm!: FormGroup
  numbers = [0,1,2,3,4,5]
  constructor(private formBuilder: FormBuilder,private commService: CommentairesService,private activeRoute: ActivatedRoute,private toastr: ToastrService) { }

 
  ngOnInit(): void {
      this.initForm()
  }
  initForm(){
    this.commentaireForm = this.formBuilder.group({
      comment: ['', Validators.required],
      evaluation: [0]
  })
  }

  publier(){
    const reservId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(reservId){
      const body = {
        contenu: this.commentaireForm.value.Commentaire,
        evaluation: this.commentaireForm.value.evaluation,
        reservation:  `api/reservations/${reservId}`
      }
      this.commService.addComnt(body).subscribe(
        (res) => {
          this.toastr.success('', 'commentaire créer')
        },
        (err)=> {
          this.toastr.error('essayer une autre fois',"Un probleme survenue")
        }
      )
    }
   
  }
}
