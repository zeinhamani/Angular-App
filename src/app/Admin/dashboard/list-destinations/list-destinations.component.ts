import { DestinationsService } from './../../../services/destinations.service';
import { Destination } from './../../../models/destination.model.ts';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-destinations',
  templateUrl: './list-destinations.component.html',
  styleUrls: ['./list-destinations.component.css']
})
export class ListDestinationsComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  destinations!: Destination[]
  constructor(private destinationS: DestinationsService) { }

  ngOnInit(): void {
    //this.destinations = this.destinationS.destinations
    this.getDestinations()
  }
  getDestinations(){
    this.destinationS.getDestList().subscribe(
      (response) => this.destinations= response["hydra:member"]
    )
  }

}
