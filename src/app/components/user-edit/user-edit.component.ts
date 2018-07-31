import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
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
          height: '600px',
          data: {
              model: this.modelFromDetail,
              newpass: ''
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
      });
  }
}
