import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthentificateComponent } from '../authentificate/authentificate.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  template: `<app-authentificate [model]="modelFromDetail" [isEdit]="true"></app-authentificate>`,
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends AuthentificateComponent implements OnInit {
  public modelFromDetail;
  constructor(public userService: UserService, router: Router, location: Location) {
    super(userService, router, location);
    this.modelFromDetail = this.userService.getLocalUser();
  }

  ngOnInit() {
  }
}
