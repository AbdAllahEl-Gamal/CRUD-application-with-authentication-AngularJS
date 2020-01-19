import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName = '';
  password = '';
  token = '';

  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('loggedUser');
    this.password = sessionStorage.getItem('loggedUserPassword');
    this.token = localStorage.getItem('ACCESS_TOKEN');
  }

}
