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

import { TextMaskModule } from 'angular2-text-mask';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AppComponent } from './app.component';
import { Routing } from './routing';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { BackendApiInterceptor } from './interceptors/backend-api.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NotFountPageComponent } from './components/not-fount-page/not-fount-page.component';

@NgModule({
    exports: [
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule
    ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    AuthentificateComponent,
    UserDetailComponent,
    LoginComponent,
    IndexComponent,
    NotFountPageComponent
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
      AuthGuardGuard,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
