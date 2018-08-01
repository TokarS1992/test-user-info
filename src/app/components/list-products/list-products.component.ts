import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MatDialog, PageEvent, MatPaginator } from '@angular/material';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { IData } from '../create-product/create-product.component';

interface IProduct {
    model: Product;
    selected: boolean;
}

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
    public listProductsUser: IProduct[] = [];
    public pageNumber = 0;
    public pageSize = 3;
    public pageSizeOptions: number[] = [3, 6, 10, 100];
    @ViewChild('paginator') namePaginator: MatPaginator;
    @Output() updateUserDetail = new EventEmitter();
    constructor(
      private dialog: MatDialog,
      private httpUserService: UserService,
      private productService: ProductService
    ) { }

    ngOnInit() {
        this.shapingListProducts(this.pageNumber, this.pageSize);
    }
    get productsLength() {
        return this.productService.getLocalProducts().length;
    }
    shapingListProducts(pageNumber: number, pageSize: number) {
        this.listProductsUser = [];
        this.productService.getProducts(pageNumber, pageSize).forEach((product: Product) => {
            this.listProductsUser.push({
                model: product,
                selected: false
            });
        });
    }
    changePaginate({ pageIndex, pageSize }) {
        this.pageSize = pageSize;
        this.pageNumber = pageIndex;
        this.shapingListProducts(pageIndex, pageSize);
    }
    deleteProduct(id) {
        this.productService.deleteProduct(id).subscribe((data: any) => {
            this.updateUserDetail.emit();
            if (this.productsLength === this.pageNumber * this.pageSize) {
                this.pageNumber--;
                this.namePaginator.previousPage();
            }
            this.shapingListProducts(this.pageNumber, this.pageSize);
        });
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
                    this.shapingListProducts(this.pageNumber, this.pageSize);
                    this.updateUserDetail.emit();
                });
            }
            if (res && res.isEdit) {
                this.productService.updateProductById(res.model.id, res.model).subscribe(() => {
                    this.updateUserDetail.emit();
                });
            }
        });
    }

}
