import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VendorService,
  AuthService,
  UserService,
  TransactionService,
  ProductService,
  OrderService,
  OrderItemService
} from './index';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VendorService,
    AuthService,
    UserService,
    ProductService,
    TransactionService,
    OrderService,
    OrderItemService
  ]
})
export class ServicesModule {
}
