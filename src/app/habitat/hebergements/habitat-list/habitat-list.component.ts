import { catchError } from 'rxjs/operators';
import { CategoriesService } from './../../../services/categories.service';
import { HabitatList } from './../../../models/habitatList.model';
import { UsersService } from './../../../services/users.service';
import { AuthService } from './../../../Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitatsService } from './../../../services/habitats.service';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habitat-list',
  templateUrl: './habitat-list.component.html',
  styleUrls: ['./habitat-list.component.css']
})
export class HabitatListComponent implements OnInit {

  habitats: HabitatList[] = [];
  totalLength!: number;
  p: number = 1;
  habitatList!: HabitatList[]
  serverUrl = environment.SERVER_URL
  catId: string | null = this.activeRoute.snapshot.paramMap.get('id')
  constructor(
    private habitatService: HabitatsService, 
    private catService: CategoriesService,
    private router: Router, 
    private userService: UsersService, 
    private activeRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    //this.habitats = this.habitatService.getHabitatList();
    this.getHabitats()
   
    
  }
  getHabitats() {
    if(this.catId){
      let id = +this.catId
       this.habitatService.getHabitatList().subscribe(
        (res) => { 
          this.habitatList = res["hydra:member"]
          for(let habitat of this.habitatList  ){
            console.log(habitat.categorie.nom)
            if(habitat.categorie.id === id){
              this.habitats.push(habitat)
            }
          }
    })
   
    } 
  }

  voirHabitat(habitatId: number) {
       this.router.navigate(['/habitats',this.catId,habitatId])
  }
  
}
