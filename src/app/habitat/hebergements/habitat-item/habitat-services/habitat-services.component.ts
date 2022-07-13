import { ServiceHabitat } from './../../../../models/service-habitat.model.ts';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habitat-services',
  templateUrl: './habitat-services.component.html',
  styleUrls: ['./habitat-services.component.css']
})
export class HabitatServicesComponent implements OnInit {

  @Input()
  services!: any[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
