import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../../interfaces/user';

const minLength = 2;
const maxLength = 16;

@Component({
  selector: 'app-authentificate',
  templateUrl: './authentificate.component.html',
  styleUrls: ['./authentificate.component.scss'],
  providers: [UserService]
})
export class AuthentificateComponent implements OnInit {
  public formCreateUser: FormGroup;
  public minLength: number = minLength;
  public maxLength: number = maxLength;
  public mask: Array<string | RegExp>;
  public loading = false;
  public model: User = {
      id: 0,
      username: '',
      secondname: '',
      phone: '',
      email: '',
      password: '',
      token: ''
  };
  constructor(
      public httpUserService: UserService,
      public router: Router
  ) {
      this.mask = ['+', '3', '8', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
      this.formCreateUser = new FormGroup({
          username: new FormControl(this.model.username, [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
          ]),
          secondname: new FormControl(this.model.secondname, [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
          ]),
          phone: new FormControl(this.model.phone, [
              Validators.required
          ]),
          email: new FormControl(this.model.email, [
              Validators.required,
              Validators.email
          ]),
          password: new FormControl(this.model.password, [
              Validators.required,
              Validators.pattern(`[a-zA-Z0-9]+`),
              Validators.minLength(this.minLength),
              Validators.maxLength(this.maxLength)
          ])
      });
  }
  ngOnInit() {}
  public createUser(form: FormGroup) {
      if (form.invalid) {
          for (const control in form.controls) {
              form.controls[control].markAsTouched();
          }
          return false;
      }
      this.loading = true;
      const body = {};
      for (const control in form.controls) {
          body[control] = form.controls[control].value;
      }
      this.httpUserService.createUser(body).subscribe(data => {
          this.router.navigate(['/login']);
      }, err => {
          console.log(err);
      });
  }
}
