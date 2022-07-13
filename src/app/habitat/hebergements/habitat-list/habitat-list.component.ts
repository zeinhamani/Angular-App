import { HabitatList } from './../../../models/habitatList.model';
import { UsersService } from './../../../services/users.service';
import { AuthService } from './../../../Auth/auth.service';
import { Router } from '@angular/router';
import { HabitatsService } from './../../../services/habitats.service';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habitat-list',
  templateUrl: './habitat-list.component.html',
  styleUrls: ['./habitat-list.component.css']
})
export class HabitatListComponent implements OnInit {

  habitats!: HabitatList[];
  constructor(
    private habitatService: HabitatsService, 
    private router: Router, 
    private userService: UsersService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    //this.habitats = this.habitatService.getHabitatList();
    this.getHabitats()
   
    
  }
  getHabitats() {
    this.habitatService.getHabitatList().subscribe(
      (habitas) => { 
        this.habitats = habitas["hydra:member"]
       }
     
    )
  }
  /*getUsers(){
   this.userService.getUserList().subscribe(
    (users) => { 
      this.users = users["hydra:member"]
     }
   )
  }*/
  voirHabitat(habitatId: number) {
       this.router.navigate(['/habitats', habitatId])
  }
  
}
