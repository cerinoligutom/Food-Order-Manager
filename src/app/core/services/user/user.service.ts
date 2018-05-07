import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs/Observable";

import { User, Order, Role } from "../models";
import {
  UserQueryResponse,
  GetCurrentLoggedInUserQuery,
  GetUserQuery,
  GetUserOrdersQuery,
  GetAllUsersQuery,
  UsersQueryResponse,
  RolesQueryResponse,
  GetUserRoles
} from "./user.query";
import {
  EditUserInput,
  EditUserMutation,
  UserMutationResponse,
  AddUserRoleMutation,
  RemoveUserRoleMutation
} from "./user.mutation";

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private apollo: Apollo) {
    this.getCurrentLoggedInUser().subscribe(user => {
      this.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  getCurrentLoggedInUser(): Observable<User> {
    if (!this.currentUser) {
      return this.apollo
        .watchQuery<UserQueryResponse>({
          query: GetCurrentLoggedInUserQuery
        })
        .valueChanges.pipe(map(result => result.data.User));
    } else {
      return new Observable(observer => {
        observer.next(this.currentUser);
        observer.complete();
      });
    }
  }

  getUser(id: string): Observable<User> {
    return this.apollo
      .watchQuery<UserQueryResponse>({
        query: GetUserQuery,
        variables: {
          id: id
        }
      })
      .valueChanges.pipe(map(result => result.data.User));
  }

  updateUser(input: EditUserInput): Observable<User> {
    return this.apollo
      .mutate<UserQueryResponse>({
        mutation: EditUserMutation,
        variables: {
          editUserInput: input
        }
      })
      .pipe(map(result => result.data.User));
  }

  getUserOrders(id: string): Observable<[Order]> {
    return this.apollo
      .watchQuery<UserQueryResponse>({
        query: GetUserOrdersQuery,
        variables: {
          id: id
        }
      })
      .valueChanges.pipe(map(result => result.data.User.Orders));
  }

  getAllUsers(): Observable<User[]> {
    return this.apollo
      .watchQuery<UsersQueryResponse>({
        query: GetAllUsersQuery
      })
      .valueChanges.pipe(map(result => result.data.Users));
  }

  getUserRoles(): Observable<Role[]> {
    return this.apollo
      .watchQuery<RolesQueryResponse>({
        query: GetUserRoles
      })
      .valueChanges.pipe(map(result => result.data.Roles));
  }

  addUserRole(userId, roleId) {
    return this.apollo
      .mutate<UserMutationResponse>({
        mutation: AddUserRoleMutation,
        variables: {
          userId: userId,
          roleId: roleId
        }
      })
      .pipe(map(result => result.data));
  }

  removeUserRole(userId, roleId) {
    return this.apollo
      .mutate<UserMutationResponse>({
        mutation: RemoveUserRoleMutation,
        variables: {
          userId: userId,
          roleId: roleId
        }
      })
      .pipe(map(result => result.data));
  }
}
