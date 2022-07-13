import { Equipement } from './../../../../models/equipement.model.ts';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.css']
})
export class EquipementsComponent implements OnInit {

  @Input()
  equipements!: any[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
