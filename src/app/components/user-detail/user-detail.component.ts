import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    private currentUser: User;
    constructor(
      private httpUserService: UserService,
      private activeRoute: ActivatedRoute
    ) { }
    ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.activeRoute, this.currentUser);
    }
}
