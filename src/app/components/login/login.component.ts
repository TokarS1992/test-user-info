import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup} from '@angular/forms';
import { AbstructForm } from '../../utils/abstructForm';

const minLength = 6;
const maxLength = 16;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService ]
})
export class LoginComponent extends AbstructForm implements OnInit {
  private form: FormGroup;
  private minLength: number = minLength;
  private maxLength: number = maxLength;
  private loading = false;
  private loginError = false;
  constructor(
      private authService: AuthenticationService,
      private route: Router
  ) {
      super();
  }

  ngOnInit() {
    this.authService.logout();
    this.form = new FormGroup({
        email: this.getFormContol('', {required: true, email: true}),
        password: this.getFormContol('', {
            required: true,
            minLength: this.minLength,
            maxLength: this.maxLength,
            pattern: `[a-zA-Z0-9]+`}),
        remember: this.getFormContol(false)
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
      const { email, password, remember } = form.controls;
      this.authService.login(email.value, password.value, remember.value).subscribe(user => {
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
