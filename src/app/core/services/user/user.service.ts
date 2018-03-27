import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import {
  GetCurrentLoggedInUserQuery, GetCurrentLoggedInUserQueryResponse
} from './user.query';

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private apollo: Apollo) {
    this.getCurrentLoggedInUser().subscribe(user => this.currentUser = user);
  }

  getCurrentLoggedInUser(): Observable<User> {
    if (!this.currentUser) {
      return this.apollo.watchQuery<GetCurrentLoggedInUserQueryResponse>({
        query: GetCurrentLoggedInUserQuery
      }).valueChanges.pipe(
        map(result => result.data.User)
      );
    } else {
      return new Observable(observer => {
        observer.next(this.currentUser);
        observer.complete();
      });
    }
  }
}
