import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { User } from '../../interfaces/user';
import { FormGroup} from '@angular/forms';
import { AbstructForm } from '../../utils/abstructForm';

export interface Idata {
    model: User;
    newpass: string;
}

@Component({
  selector: 'app-change-pass-modal',
  templateUrl: './change-pass-modal.component.html',
  styleUrls: ['./change-pass-modal.component.scss']
})
export class ChangePassModalComponent extends AbstructForm implements OnInit {
    public formChangePass: FormGroup;
    public minLength = 6;
    public maxLength = 16;
    private error;
    constructor(
        public dialogRef: MatDialogRef<ChangePassModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Idata) {
        super();
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    checkForm(form: FormGroup) {
        if (form.valid) {
            const { oldpass, newpass, repeat} = form.controls;
            if (oldpass.value !== this.data.model.password) {
                this.error = 'Old pass inccorect. Please enter valid old pass';
                return false;
            }
            if (newpass.value !== repeat.value) {
                this.error = 'New pass and repeat pass will be duplicate';
                return false;
            }
            if (newpass.value === oldpass.value) {
                this.error = 'New pass and old pass not will be duplicate';
                return false;
            }
            this.data.model.password = newpass.value;
            this.data.newpass = newpass.value;
            this.dialogRef.close(this.data);
        }
    }
    ngOnInit() {
        this.formChangePass = new FormGroup({
            oldpass: this.getFormControl('', {
                required: true,
                minLength: this.minLength,
                maxLength: this.maxLength,
                pattern: `[a-zA-Z0-9]+`}),
            newpass: this.getFormControl('', {
                required: true,
                minLength: this.minLength,
                maxLength: this.maxLength,
                pattern: `[a-zA-Z0-9]+`}),
            repeat: this.getFormControl('', {
                required: true,
                minLength: this.minLength,
                maxLength: this.maxLength,
                pattern: `[a-zA-Z0-9]+`})
        });
    }
}
