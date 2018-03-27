import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { User } from '../../core/services/models';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.getUser(params['id']).subscribe(user => {
          this.user = user;
        });
      } else {
        this.userService.getCurrentLoggedInUser().subscribe(user => {
          this.user = user;
        });
      }
    });
  }

}
