import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { User } from '../../core/services/models';
import { EditUserInput } from '../../core/services/user/user.mutation';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  editProfileFormData: EditUserInput;
  isCurrentLoggedInUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.getUser(params['id']).subscribe(user => {
          this.user = user;
          this.populateEditProfileForm(user);
        });
      } else {
        this.userService.getCurrentLoggedInUser().subscribe(user => {
          this.user = user;
          this.isCurrentLoggedInUser = true;
          this.populateEditProfileForm(user);
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
}
