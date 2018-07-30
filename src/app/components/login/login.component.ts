import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

const minLength = 6;
const maxLength = 16;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService ]
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private minLength: number = minLength;
  private maxLength: number = maxLength;
  private loading = false;
  private loginError = false;
  constructor(
      private authService: AuthenticationService,
      private route: Router
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.form = new FormGroup({
        email: new FormControl('', [
            Validators.email,
            Validators.required
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(`[a-zA-Z0-9]+`),
            Validators.minLength(this.minLength),
            Validators.maxLength(this.maxLength)
        ])
    });
  }
  public submitForm(form: FormGroup) {
      if (form.invalid) {
          for (const control in this.form.controls) {
              this.form.controls[control].markAsTouched();
          }
          return false;
      }
      this.loading = true;
      const { email, password } = form.controls;
      this.authService.login(email.value, password.value).subscribe(user => {
          this.loginError = false;
          this.route.navigate([`/users/${user.id}`]);
      }, error => {
          if (error === 'Username or password is incorrect') {
              this.loginError = error;
          }
          this.loading = false;
      });
  }
}
