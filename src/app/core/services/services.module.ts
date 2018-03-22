import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorService, AuthService } from './index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VendorService,
    AuthService
  ]
})
export class ServicesModule {
}
