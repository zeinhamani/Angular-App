import { ProprietaireComponent } from './../proprietaire.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications!: [{content: string}]
  constructor(private prop: ProprietaireComponent ) { }

  ngOnInit(): void {
    this.notifications = this.prop.currentUser.notifications
  }

}
