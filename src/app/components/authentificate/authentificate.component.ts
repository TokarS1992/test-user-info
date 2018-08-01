import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { User } from '../../interfaces/user';
import { AbstructForm } from '../../utils/abstructForm';

const minLength = 2;
const maxLength = 255;
const maxLengthPass = 16;
const minLengthPass = 6;

const timerAcrossToLogin = 3;

@Component({
  selector: 'app-authentificate',
  templateUrl: './authentificate.component.html',
  styleUrls: ['./authentificate.component.scss'],
  providers: [ SharedService ]
})
export class AuthentificateComponent extends AbstructForm implements OnInit, OnChanges {
  private formCreateUser: FormGroup;
  private minLength: number = minLength;
  private maxLength: number = maxLength;
  private maxLengthPass: number = maxLengthPass;
  private minLengthPass: number = minLengthPass;
  private mask: Array<string | RegExp>;
  private loading = false;
  private timer;
  @Input() private model: User = {
      id: 0,
      username: '',
      secondname: '',
      phone: '',
      email: '',
      password: '',
      token: '',
      remember: false,
      products: []
  };
  @Input() private isEdit = false;
  @Input() isUpdate = false;
  @Output() editForm = new EventEmitter<any>();
  @Output() changePass = new EventEmitter<any>();
  constructor(
      private httpUserService: UserService,
      private router: Router,
      private location: Location,
      private shared: SharedService
  ) {
      super();
  }
  ngOnInit() {
      this.mask = ['+', '3', '8', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
      this.formCreateUser = new FormGroup({
          username: this.getFormControl(this.model.username, {required: true, minLength: this.minLength, maxLength: this.maxLength}),
          secondname: this.getFormControl(this.model.username, {required: true, minLength: this.minLength, maxLength: this.maxLength}),
          phone: this.getFormControl(this.model.phone, {required: true}),
          email: this.getFormControl(this.model.email, {required: true, email: true}),
          password: this.getFormControl(this.model.password, {
              required: true,
              minLength: this.minLengthPass,
              maxLength: this.maxLengthPass,
              pattern: `[a-zA-Z0-9]+`
          })
      });
  }
  ngOnChanges(changes: SimpleChanges) {
      if (changes['isUpdate'].currentValue) {
          this.timing(`/users/${this.httpUserService.getLocalUser().id}`, timerAcrossToLogin);
      }
  }
  private changePassHandler() {
      this.changePass.emit();
  }
  private createUser(form: FormGroup) {
      const body = {};
      const checkForm = this.checkControlMarkAsTouched(form);
      if (!checkForm) {
          return false;
      } else {
          this.loading = true;
          for (const control in form.controls) {
              body[control] = form.controls[control].value;
          }
          if (this.isEdit) {
              this.editForm.emit({user: body});
              return true;
          }
          this.httpUserService.createUser(body).subscribe(data => {
              this.timing('/login', timerAcrossToLogin);
          }, err => {
              this.loading = false;
              console.log(err);
          });
      }
  }
  private toProfileOrLogin() {
      if (!this.isEdit) {
          this.router.navigate(['/login']);
      }
      return this.location.back();
  }
  private timing(pathto: string, timeout: number) {
      this.shared.setDecimal(timeout);
      this.timer = setInterval(() => {
          this.shared.decimal--;
          if (this.shared.decimal === 0) clearInterval(this.timer);
      }, 1000);
      setTimeout(() => {
          this.router.navigate([pathto]);
      }, timeout * 1000);
  }
}
