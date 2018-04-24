import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/services';
import { User, Order } from '@app/models';
import { EditUserInput } from '../../core/services/user/user.mutation';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  user: User;
  editProfileFormData: EditUserInput;
  isCurrentLoggedInUser = false;
  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { super(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.getUser(params['id']).subscribe(user => {
          this.user = user;
          this.populateEditProfileForm(user);
        });
        this.userService.getUserOrders(params['id']).subscribe(orders => {
          this.orders = orders;
        });
      } else {
        this.userService.getCurrentLoggedInUser().subscribe(user => {
          this.user = user;
          this.isCurrentLoggedInUser = true;
          this.populateEditProfileForm(user);
        });
        this.userService.getUserOrders(this.currentLoggedInUser.id).subscribe(orders => {
          this.orders = [...orders].reverse();
        });
      }
    });
  }

  onSubmitEditProfile(form: EditUserInput) {
    this.userService.updateUser(form).subscribe(user => this.user = user);
  }

  populateEditProfileForm(user: User) {
    this.editProfileFormData = {
      id: user.id,
      caption: user.caption,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      image: user.image,
      nickname: user.nickname
    };

    if (user.birthdate && user.birthdate.raw) {
      this.editProfileFormData.birthdate = new Date(user.birthdate.raw);
    }
  }

  goToTransaction(transactionId: string) {
    this.router.navigate(['/transaction', transactionId]);
  }
}
