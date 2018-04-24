import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services';
import { User } from '../../core/services/models';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  user: User;

  routes = [
    { name: 'Dashboard', path: ['/dashboard/activity'] },
    // { name: 'Statistics', path: ['/statistics'] },
    { name: 'Admin', path: ['/admin'] }
  ];

  userRoutes = [
    { name: 'My Profile', path: ['/user'] }
  ];

  constructor(private userService: UserService) { super(); }

  ngOnInit() {
    this.userService.getCurrentLoggedInUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    // TODO
    alert('logout');
  }

}
