import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { CheckExpiresGuard } from './guards/check-expires.guard';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NotFountPageComponent } from './components/not-fount-page/not-fount-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
    { path: '', component: IndexComponent, canActivate: [AuthGuardGuard, CheckExpiresGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'authenticate', component: AuthentificateComponent },
    { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuardGuard, CheckExpiresGuard]},
    { path: 'users/:id/edit', component: UserEditComponent, canActivate: [AuthGuardGuard, CheckExpiresGuard]},
    { path: 'not-found', component: NotFountPageComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
})
export class Routing {}

