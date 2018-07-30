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
  private returnUrl: string;
  private form: FormGroup;
  private minLength: number = minLength;
  private maxLength: number = maxLength;
  private loading = false;
  constructor(
      private authService: AuthenticationService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          console.log(user);
      }, error => {
          console.log(error);
          this.loading = false;
      });
  }
}
