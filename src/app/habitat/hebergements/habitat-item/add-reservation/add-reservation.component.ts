import { Router } from '@angular/router';
import { LocataireComponent } from './../../../../Locataire/locataire/locataire.component';
import { ReservationsService } from './../../../../services/reservations.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model.ts';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  reservForm!: FormGroup ;
  currentUser!: User
  paymentHandler: any = null
  @Input() 
  prix!: number
  @Input()
  id!: number
  total!: number
  
  constructor(private formBuilder: FormBuilder, 
              private reserService: ReservationsService,
              private authService: AuthService ,
              private userService:UsersService,
              private router: Router
              
              ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentUser()
    this.invokeStripe()
  }

  initForm(){
    this.reservForm = this.formBuilder.group({
      date_arrivee: ['', Validators.required],
      date_depart: ['', Validators.required],
      personnes: ['', Validators.required],     
    })
  }
  invokeStripe(){
    if(!window.document.getElementById('strip-script')){
      const script = window.document.createElement('script');
      script.id = 'stripe-script'
      script.type = 'text/javascript'
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script)
    }
  }
  payer(amount: any, arriv: any, depart: any , Npers: any, user: any, habitat: any, service: any,router: any){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51LPYUvDmuzp9INVaLB96h2v8yMzYO0fbfjKKTek2tgv3QO8KqwSeSwaGLirTcnKa4bU5a2xtwSdZTFKo5fBRDJqF00o8UZj8MN',
      locale: 'auto',
      token: function(stripeToken: any){
        const stripeTokenId = stripeToken.id 
        var body = {
          stripeTokenId: stripeTokenId ,
          DateArrivee:  arriv ,
          DateDepart: depart ,
          NombrePersonnes: Npers,
          MontantTotal: amount ,
          Annulee: false,
          user: user,
          habitat: habitat,
      
        }
        
        console.log(body)
        service.addReserv(body).subscribe(
          () => router.navigate(['Locataire/reservations']) 
         )
        alert('Stripe token est géneré!')
      }
    });

    paymentHandler.open({
      name: 'Habitat Titre',
      description: '7 personnes',
      amount: amount * 100
    })
  }
  reserver() {
      const habitat =  `api/habitats/${this.id}`
      const user = `api/users/${this.currentUser.id}` 
      const Npers = this.reservForm.value.personnes
      const datArriv = new Date(this.reservForm.value.date_arrivee)
      const datDepart = new Date(this.reservForm.value.date_depart)
      const days = (datDepart.getTime() - datArriv.getTime() ) / 1000 / 60 / 60 / 24 
      const total = this.prix * days * Npers 
      this.payer(total,
                 this.reservForm.value.date_arrivee,
                 this.reservForm.value.date_depart,
                 Npers,
                 user,
                 habitat, 
                 this.reserService,
                 this.router )
        
  }
  getCurrentUser() { 
    this.userService.getUserList().subscribe(
      (response) => {
         const users =  response["hydra:member"]
         for(const key of Object.keys( users) ){
          console.log(`${key} => ${users[key].email}`)
          if(users[key].email === this.authService.getTokenData().username){
            this.userService.getUserItem(users[key].id).subscribe(
               (res) => {
                 this.currentUser = res 
                
               }
            )
          }
        }
         
      }
    )
  }
}
