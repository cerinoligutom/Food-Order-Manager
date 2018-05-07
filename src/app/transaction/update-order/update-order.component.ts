import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '@app/components';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Product, AddInitialOrderItemInput, AddOrderInput, OrderItem } from '@app/models';
import { MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { ProductService, OrderItemService } from '@app/services';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { CompileMetadataResolver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface OrderItemInput {
  product: Product,
  quantity: number,
  comment: string,
  order_id: string
}


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent extends BaseComponent implements OnInit {

  productCtrl: FormControl;
  orderItems = [];
  calculatedTotalSum = 0;
  filteredProducts: Observable<any[]>;
  vendorProducts: Product[];
  orderItemInput: OrderItemInput;
  hasOrdered: boolean = false;

  updatedOrderItems = [];

  constructor(public dialogRef: MatDialogRef<UpdateOrderComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private orderItemService: OrderItemService) {
    super();
  }

  ngOnInit() {

    this.productCtrl = new FormControl();
    this.initAddOrderItemInput();

    this.data.order.OrderItems.forEach(element => {
      this.orderItems.push({
        product: element.Product,
        quantity: element.quantity,
        comment: element.comment
      })
    });

    this.calculatedTotalSum = this.calculateTotalSum();

    //Set products
    this.productService.getVendorProducts(this.data.vendorId).subscribe(result => {
      this.vendorProducts = result;

      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        map((product: any) => product ? this.filterProducts(product) : this.vendorProducts.slice())
      );

      console.log("ORDER ITEMS: ", this.orderItems);
    });
  }

  filterProducts(product: any) {
    let name = (product && product.name ? product.name : product);

    console.log('name', name);
    return this.vendorProducts.filter(product => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  getSelectedProduct(product) {
    this.orderItemInput.product = product;
  }

  getProductName(product) {
    if (!product) return '';
    return product.name;
  }

  initAddOrderItemInput() {
    this.orderItemInput = {
      product: undefined,
      quantity: 1,
      comment: '',
      order_id: this.data.order.id
    };

    this.productCtrl.setValue('');
  }

  addUpdatedItem() {
    this.updatedOrderItems.push(
      {
        order_id: this.data.order.id,
        product_id: this.orderItemInput.product.id,
        quantity: this.orderItemInput.quantity,
        comment: this.orderItemInput.comment
      }
    );
    this.orderItems.push(this.orderItemInput);
    this.calculatedTotalSum = this.calculateTotalSum();
    this.initAddOrderItemInput();
    this.hasOrdered = true;
  }

  onUpdateOrder() {
    this.orderItemService.addOrderItem(this.updatedOrderItems).subscribe(result => {
      console.log("order updated: ", result);
      this.dialogRef.close(result);
    });
  }

  calculateTotalSum() {
    return this.orderItems.reduce((sum, orderItem) => {
      return sum += (orderItem.product.price * orderItem.quantity)
    }, 0);
  }
}


