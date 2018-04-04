import { User } from '@app/models';
import * as moment from 'moment';


export class BaseComponent {
  defaultUserImage = 'assets/user.png';
  defaultVendorImage = 'assets/vendor.png';
  defaultProductImage = 'assets/vendor.png';
  currentLoggedInUser: User;

  constructor() {
    this.currentLoggedInUser = JSON.parse(localStorage.getItem('user'));
  }

  formatDates(date: any){
    let tmp = moment(date);

    return {
      shortDate: tmp.format('MMM DD, YYYY'),
      time: tmp.format('h:mm a')
    }
  }
}
