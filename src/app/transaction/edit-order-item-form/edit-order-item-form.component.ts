import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderItemService, OrderService } from '@app/services';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-edit-order-item-form',
  templateUrl: './edit-order-item-form.component.html',
  styleUrls: ['./edit-order-item-form.component.scss']
})
export class EditOrderItemFormComponent extends BaseComponent implements OnInit {

  orderItem: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditOrderItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderItemService: OrderItemService,
    private orderService: OrderService

  ) { super(); }

  ngOnInit() {

    this.orderItemService.getOrderItemById(this.data.orderItemId).subscribe( orderItem => {
      console.log('get order item', orderItem);
      this.orderItem = {...orderItem};
    });

  }

  sortData(){

  }

  incrementQuantity(orderItem) {
    orderItem.quantity += 1;
  }

  decrementQuantity(orderItem) {
    orderItem.quantity -= 1;
  }

  updateOrderItem(orderItem){
    this.dialogRef.close(orderItem);
  }





}
