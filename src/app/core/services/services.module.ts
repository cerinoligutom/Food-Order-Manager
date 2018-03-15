import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorService } from './vendor/vendor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [VendorService]
})
export class ServicesModule {
}
