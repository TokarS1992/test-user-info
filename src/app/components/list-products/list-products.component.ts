import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MatDialog } from '@angular/material';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { PageEvent } from '@angular/material';
import { IData } from '../create-product/create-product.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
    public listProductsUser: Product[] = [];
    public pageNumber = 0;
    public pageSize = 3;
    public pageSizeOptions: number[] = [3, 6, 10, 100];
    public pageEvent: PageEvent;
    @Output() updateUserDetail = new EventEmitter();
    constructor(
      private dialog: MatDialog,
      private httpUserService: UserService,
      private productService: ProductService
    ) { }

    ngOnInit() {
        this.listProductsUser = this.productService.getProducts(this.pageNumber, this.pageSize);
        // this.listProductsUser = this.httpUserService.getLocalUser().products;
    }
    get productsLength() {
        return this.productService.getLocalProducts().length;
    }
    changePaginate({ pageIndex, pageSize }) {
        this.pageSize = pageSize;
        this.pageNumber = pageIndex;
        this.listProductsUser = this.productService.getProducts(pageIndex, pageSize);
    }
    openModalChangePass(data?: Product, isEdit: boolean = false) {
        const dialogRef = this.dialog.open(CreateProductComponent, {
            width: '500px',
            height: '80vh',
            data: {
                model: data ? data : {
                    name: '',
                    description: '',
                    price: null
                },
                isEdit: isEdit
            }
        });

        dialogRef.afterClosed().subscribe((res: IData) => {
            if (res && !res.isEdit) {
                this.productService.createProduct(res.model).subscribe(() => {
                    this.listProductsUser = this.productService.getProducts(this.pageNumber, this.pageSize);
                    this.updateUserDetail.emit();
                });
            }
            if (res && res.isEdit) {
                this.productService.updateProductById(res.model.id, res.model).subscribe(() => {
                    this.listProductsUser = this.httpUserService.getLocalUser().products;
                    this.updateUserDetail.emit();
                });
            }
        });
    }

}
