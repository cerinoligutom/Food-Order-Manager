import { Component, OnInit, ViewChild } from "@angular/core";
import { VendorService, UserService } from "../../core/services";
import { MatDialog, MatTableDataSource, MatPaginator } from "@angular/material";
import { AddVendorComponent } from "../add-vendor/add-vendor.component";
import { AddProductComponent } from "../add-product/add-product.component";
import { ProductService } from "../../core/services/product/product.service";
import { ManageProductComponent } from "../manage-product/manage-product.component";
import { BaseComponent } from "@app/components";
import { User, ScalarDate } from "@app/models";
import { GetUserRoles } from "../../core/services/user/user.query";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent extends BaseComponent implements OnInit {
  vendors: VendorAccordionItem[] = [];
  dataSource: MatTableDataSource<ProductTableElement>;
  userDataSource: MatTableDataSource<User>;
  userDisplayedColumns = ["image", "name", "admin"];
  displayedColumns = ["image", "name", "price"];
  isAdmin: Boolean = true;
  disableRoleToggle: Boolean = false;
  adminId: string;

  constructor(
    private vendorService: VendorService,
    private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendor => {
      this.vendors = vendor.map(
        x =>
          <VendorAccordionItem>{
            id: x.id,
            name: x.name,
            image: x.image
          }
      );
    });

    this.userService.getUserRoles().subscribe(roles => {
      roles.forEach(role => {
        if (role.name === "admin") {
          this.adminId = role.id;
        }
      });

      console.log("admin id", this.adminId);
    });
  }

  openAddVendorDialog(): void {
    const dialogRef = this.dialog.open(AddVendorComponent, {
      width: "300px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vendorService.addVendor(result).subscribe(vendor => {
          this.vendors.push(vendor);
        });
      }
    });
  }

  onVendorExpand(vendorId) {
    this.productService.getVendorProducts(vendorId).subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }

  onUsersExpand() {
    this.userService.getAllUsers().subscribe(users => {
      this.userDataSource = new MatTableDataSource(users);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyUserFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.userDataSource.filter = filterValue;
  }

  toggleUserRole(userId, roleId, isAdmin){
    if(isAdmin){
      this.userService.removeUserRole(userId, roleId).subscribe(result => {
        console.log(result);
      });
    }else{
      this.userService.addUserRole(userId, roleId).subscribe(result => {
        console.log(result);
      });
    }
  }

  openAddProductDialog(vendorId): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: "300px",
      data: {
        vendorId: vendorId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(product => {
          this.dataSource.data = [...this.dataSource.data, product];
        });
      }
    });
  }

  updateVendor(form: any) {
    this.vendorService.editVendor(form).subscribe(vendor => {
      console.log("updated vendor = ", vendor);
    });
  }

  selectUserRow(row) {
    console.log("user selected row", row);
  }

  selectRow(row) {
    const dialogRef = this.dialog.open(ManageProductComponent, {
      width: "300px",
      data: {
        product: row
      }
    });

    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        if (product.id) {
          this.productService.editProduct(product).subscribe(result => {
            console.log("updated product ", result);
          });
        } else {
          this.productService.deleteProduct(product).subscribe(result => {
            console.log("deleted product id ", product);
            this.dataSource.data = this.dataSource.data.filter(
              (temp: any) => temp.id != product
            );
          });
        }
      }
    });
  }
}

export class VendorAccordionItem {
  id: string;
  name: string;
  image: string;
}

export interface ProductTableElement {
  name: string;
  price: number;
  image?: string;
  is_active: boolean;
}
