import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UkmcodeComponent } from './ukmcode/ukmcode.component';
import { UkmDetailComponent } from './ukm-detail/ukm-detail.component';

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
    path: 'ukmcode',
    component: UkmcodeComponent
  },
  {
    path: 'home/:kode',
    component: UkmDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
