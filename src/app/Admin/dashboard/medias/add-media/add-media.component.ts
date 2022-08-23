import { MediasService } from './../../../../services/medias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

  file!: any;
  constructor(private mediasService: MediasService) { }

  ngOnInit(): void {
  }

  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }

  uploadMedia() {
    this.mediasService.addMedia(this.file).subscribe(
      (response) => console.log(response)
    )
  }

}
