import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';

import { TextMaskModule } from 'angular2-text-mask';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { CheckExpiresGuard } from './guards/check-expires.guard';
import { AppComponent } from './app.component';
import { Routing } from './routing';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { BackendApiInterceptor } from './interceptors/backend-api.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NotFountPageComponent } from './components/not-fount-page/not-fount-page.component';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';
import { KeysPipe } from './pipes/keys.pipe';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ChangePassModalComponent } from './components/change-pass-modal/change-pass-modal.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@NgModule({
    exports: [
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatExpansionModule
    ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductsComponent,
    ChangePassModalComponent,
    AppComponent,
    AuthentificateComponent,
    UserDetailComponent,
    LoginComponent,
    IndexComponent,
    NotFountPageComponent,
    UserEditComponent,
    KeysPipe
  ],
  imports: [
    TextMaskModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Routing
  ],
  providers: [
      ProductService,
      AuthGuardGuard,
      CheckExpiresGuard,
      UserService,
      AuthenticationService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: BackendApiInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
      }
  ],
  entryComponents: [ChangePassModalComponent, CreateProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
