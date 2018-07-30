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
    private currentUser: User = {};
    constructor(
      private httpUserService: UserService,
      private activeRoute: ActivatedRoute,
      private router: Router
    ) { }
    ngOnInit() {
        this.httpUserService.getUserById(+this.activeRoute.params.value.id).subscribe(user => {
            this.currentUser = user;
        }, err => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (err === 'User not found') {
                this.router.navigate(['/not-found']);
            }
            if (err === 'Not access') {
                this.router.navigate([`/users/${currentUser.id}`]);
                this.currentUser = currentUser;
            }
        });
    }
}
