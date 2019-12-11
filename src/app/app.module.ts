import { AngularMaterialModule } from "./angular-material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./_shared/component/header/header.component";
import { FooterComponent } from "./_shared/component/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UkmDetailComponent } from "./ukm-detail/ukm-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';

import { LoginFormComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddUkmComponent } from "./add-ukm/add-ukm.component";
import { UpdateUkmComponent } from "./update-ukm/update-ukm.component";
import { FavouriteComponent } from "./favourite/favourite.component";
import { SearchPipe } from './../../src/app/_shared/services/search.pipe';
import { ProfilKelompokComponent } from './profil-kelompok/profil-kelompok.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    UkmDetailComponent,
    LoginFormComponent,
    ProfileComponent,
    AddUkmComponent,
    UpdateUkmComponent,
    FavouriteComponent,
    SearchPipe,
    ProfilKelompokComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
