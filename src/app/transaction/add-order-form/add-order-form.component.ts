import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { ProductService, OrderService } from '@app/services';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AddInitialOrderItemInput, Product } from '@app/models';
import { BaseComponent } from '@app/components';
import { AddOrderInput } from '../../core/services/order/order.mutation';

class AddOrderFormFactory {
  toAddOrderItemInput(input: OrderItemInput[]): AddInitialOrderItemInput[] {
    return input.map(orderItem => {
      return {
        product_id: orderItem.product.id,
        quantity: +orderItem.quantity,
        comment: orderItem.comment
      };
    });
  }
}

interface OrderItemInput {
  product: Product;
  quantity: number;
  comment: string;
}

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss']
})
export class AddOrderFormComponent extends BaseComponent implements OnInit {

  vendorProducts: Product[];
  productCtrl: FormControl;
  filteredProducts: Observable<any[]>;

  orderItems: OrderItemInput[] = [];

  addOrderItemInput: OrderItemInput;

  addOrderFormFactory = new AddOrderFormFactory();

  addOrderInput: AddOrderInput;

  hasOrdered: boolean = false;

  sortedData;

  constructor(
    public dialogRef: MatDialogRef<AddOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private orderService: OrderService
  ) { super(); }

  ngOnInit() {
    this.productCtrl = new FormControl();
    this.initAddOrderItemInput();

    this.productService.getVendorProducts(this.data.vendorId).subscribe(result => {
      this.vendorProducts = result;

      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        map((product: any) => product ? this.filterProducts(product) : this.vendorProducts.slice())
      );
    });
  }

  filterProducts(product: any) {
    let name = (product && product.name ? product.name : product);

    console.log('name', name);
     return this.vendorProducts.filter(product => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  getSelectedProduct(product) {
    this.addOrderItemInput.product = product;
  }

  getProductName(product) {
    if (!product) return '';
    return product.name;
  }

  addToOrderItemsList() {
    this.orderItems.push(this.addOrderItemInput);
    this.initAddOrderItemInput();
    this.hasOrdered = true;
  }

  initAddOrderItemInput() {
    this.addOrderItemInput = {
      product: undefined,
      quantity: 1,
      comment: ''
    };

    this.productCtrl.setValue('');
  }

  onCreateOrder() {
    this.addOrderInput = {
      user_id: this.currentLoggedInUser.id,
      transaction_id: this.data.transactionId,
      orderItems: this.addOrderFormFactory.toAddOrderItemInput(this.orderItems)
    }

    this.orderService.addOrder(this.addOrderInput).subscribe(result => {
      console.log('order added', result);
      this.dialogRef.close(result);
    });
    console.log('order form:', this.addOrderInput);
  }

  incrementQuantity(orderItem) {
    orderItem.quantity += 1;
  }

  decrementQuantity(orderItem) {
    orderItem.quantity -= 1;
  }

  sortData(sort: Sort) {
    const data = this.orderItems.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.product.name, b.product.name, isAsc);
        case 'quantity': return compare(+a.quantity, +b.quantity, isAsc);
        case 'price': return compare(+a.product.price, +b.product.price, isAsc);
        case 'total': return compare(+a.product.price * +a.quantity, +b.product.price * +a.quantity, isAsc);
        default: return 0;
      }
    });
  }

  calculateTotalSum() {
    return this.orderItems.reduce((sum, orderItem) => {
      return orderItem.product.price * orderItem.quantity
    }, 0);
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
