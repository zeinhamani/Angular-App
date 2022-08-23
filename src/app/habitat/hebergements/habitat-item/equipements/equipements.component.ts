import { Equipement } from './../../../../models/equipement.model.ts';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.css']
})
export class EquipementsComponent implements OnInit {

  @Input()
  equipements!: Equipement[];

  serverUrl = environment.SERVER_URL
  constructor() { }

  ngOnInit(): void {
    
  }

}
