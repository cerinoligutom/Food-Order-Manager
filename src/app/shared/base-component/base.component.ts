import { User } from '@app/models';

export class BaseComponent {
  defaultUserImage = 'assets/user.png';
  defaultVendorImage = 'assets/vendor.png';
  currentLoggedInUser: User;

  constructor() {
    this.currentLoggedInUser = JSON.parse(localStorage.getItem('user'));
  }
}
