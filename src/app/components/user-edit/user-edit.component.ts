import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { Idata } from '../change-pass-modal/change-pass-modal.component';
import { ChangePassModalComponent } from '../change-pass-modal/change-pass-modal.component';

@Component({
  selector: 'app-user-edit',
  template: `<app-authentificate
          [model]="modelFromDetail"
          [isEdit]="true"
          (editForm)="editProfile($event)"
          (changePass)="openModalChangePass()"
          [isUpdate]="isUpdateEdit"
  ></app-authentificate>`,
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public modelFromDetail;
  private isUpdateEdit = false;
  constructor(
      private userService: UserService,
      private dialog: MatDialog
  ) {
    this.modelFromDetail = this.userService.getLocalUser();
  }

  ngOnInit() {}
  editProfile({ user} ) {
      this.userService.updateUserById(this.userService.getLocalUser().id, user).subscribe(data => {
          this.isUpdateEdit = true;
      });
  }
  openModalChangePass() {
      const dialogRef = this.dialog.open(ChangePassModalComponent, {
          width: '500px',
          height: '80vh',
          data: {
              model: this.modelFromDetail,
              newpass: ''
          }
      });

      dialogRef.afterClosed().subscribe((result: Idata) => {
          if (result) {
              this.userService.updateUserById(result.model.id, result.model).subscribe(updateUser => {
                  console.log(updateUser);
              });
          }
      });
  }
}
