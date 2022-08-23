import { Router } from '@angular/router';
import { MediasService } from './../../../services/medias.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Media } from 'src/app/models/media.model.ts';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  serverUrl = environment.SERVER_URL
  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  medias!: Media[]
  totalLength!: number;
  p: number = 1;
  constructor(private mediaService: MediasService, private router: Router) { }
  
  ngOnInit(): void {
    this.getMedias()
  }

  getMedias(){
    this.mediaService.getMediaList().subscribe(
      (response) => {
        this.medias = response["hydra:member"]
        this.totalLength = response["hydra:totalItems"]
      }
    )
  }

  addMedia(){
      this.router.navigate(['Admin/medias/add']) 
  }

}
