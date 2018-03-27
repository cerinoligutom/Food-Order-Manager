import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import {
  UserQueryResponse,
  GetCurrentLoggedInUserQuery,
  GetUserQuery
} from './user.query';
import {
  EditUserInput, EditUserMutation
} from './user.mutation';

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private apollo: Apollo) {
    this.getCurrentLoggedInUser().subscribe(user => this.currentUser = user);
  }

  getCurrentLoggedInUser(): Observable<User> {
    if (!this.currentUser) {
      return this.apollo.watchQuery<UserQueryResponse>({
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

  getUser(id: string): Observable<User> {
    return this.apollo.watchQuery<UserQueryResponse>({
      query: GetUserQuery,
      variables: {
        id: id
      }
    }).valueChanges.pipe(
      map(result => result.data.User)
    );
  }

  updateUser(input: EditUserInput): Observable<User> {
    return this.apollo.mutate<UserQueryResponse>({
      mutation: EditUserMutation,
      variables: {
        editUserInput: input
      }
    }).pipe(
      map(result => result.data.User)
    );
  }
}
