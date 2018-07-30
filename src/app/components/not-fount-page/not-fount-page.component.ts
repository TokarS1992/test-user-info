import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-not-fount-page',
  templateUrl: './not-fount-page.component.html',
  styleUrls: ['./not-fount-page.component.scss']
})
export class NotFountPageComponent implements OnInit {
  private currentUser: User = {
      id: 0,
      username: '',
      secondname: '',
      phone: '',
      email: '',
      password: '',
      token: ''
  };
  constructor(
      private router: Router,
      private userService: UserService
  ) { }

  ngOnInit() {}
  public returnToCurrentProfile() {
      this.router.navigate([`/users/${this.userService.getLocalUser().id}`]);
  }
}
