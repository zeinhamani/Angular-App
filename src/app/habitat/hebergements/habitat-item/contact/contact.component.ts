import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input()
  email!: string;
  @Input()
  tel!: string;
  constructor() { }

  ngOnInit(): void {
    this.email = 'zeinhamani@gmail.com';
    this.tel = '0646823979';
  }

}
