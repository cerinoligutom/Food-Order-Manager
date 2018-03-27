import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorService, AuthService, UserService } from './index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VendorService,
    AuthService,
    UserService
  ]
})
export class ServicesModule {
}
