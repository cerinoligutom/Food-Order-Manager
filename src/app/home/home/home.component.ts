import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routes = [
    { name: 'Dashboard', path: ['/dashboard/activity']},
    { name: 'Statistics', path: ['/statistics']}
  ];

  constructor() { }

  ngOnInit() {
  }

}
