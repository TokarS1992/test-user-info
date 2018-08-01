import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup} from '@angular/forms';
import { AbstructForm } from '../../utils/abstructForm';
import { ListProductsComponent } from '../list-products/list-products.component';
import { Product } from '../../interfaces/product';

export interface IData {
    model: Product;
    isEdit: boolean;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends AbstructForm implements OnInit {
    public formCreateProduct: FormGroup;
    public maxLength = 255;
    public maxDescription = 1000;
    constructor(
        public dialogRef: MatDialogRef<ListProductsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IData) {
        super();
    }

    ngOnInit() {
        console.log(this.data.model);
        this.formCreateProduct = new FormGroup({
            name: this.getFormControl(this.data.model.name, {required: true, maxLength: this.maxLength}),
            description: this.getFormControl(this.data.model.description, {required: true, maxLength: this.maxDescription}),
            price: this.getFormControl(this.data.model.price, {required: true, pattern: /\d+\.\d{2}/})
        });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    checkForm(form: FormGroup) {
        const checkValidForm = this.checkControlMarkAsTouched(form);
        const body: any = {};
        if (!checkValidForm) {
            return false;
        } else {
            for (const control in form.controls) {
                body[control] = form.controls[control].value;
            }
            if (this.data.isEdit) {
                body.id = this.data.model.id;
            }
            this.dialogRef.close({model: body, isEdit: this.data.isEdit});
        }
    }
}
