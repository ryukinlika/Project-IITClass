import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login/login.component';
import { UkmDetailComponent } from './ukm-detail/ukm-detail.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: 'ukmdetail/:kode',
    component: UkmDetailComponent
  },
  {
    path: 'login',
    component: LoginFormComponent, pathMatch: 'full'
  },
  {
    path: 'home/:kode',
    component: UkmDetailComponent
  },
  {
    path: 'user',
    component: ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
