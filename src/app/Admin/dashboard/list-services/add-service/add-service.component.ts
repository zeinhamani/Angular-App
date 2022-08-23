import { Router } from '@angular/router';
import { HabitatServicesService } from 'src/app/services/habitat-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private servService: HabitatServicesService,private toastr: ToastrService, private router: Router){}
  addForm!: FormGroup
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
  get description() {
    return this.addForm.get('description')
  }
 
  initForm(){
    this.addForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      description: ['', [Validators.required]] 
    })
  }
  
  creerService(){
      this.servService.addServ(this.addForm.value).subscribe(
        (res) => {
          this.toastr.success('', 'Service bien créer!')
          this.router.navigate(['Admin/services'])
         } ,
        (err) => this.toastr.error('essayer plus tard',"Création échouée")
      )
    } 

}
