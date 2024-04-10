import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { SigupComponent } from './view/sigup/sigup.component';
import { MiComponent } from './view/mi/mi.component';
import { HomeComponent } from './view/home/home.component';
import { UserComponent } from './view/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './view/complemets/footer/footer.component';
import { NavComponent } from './view/complemets/nav/nav.component';
import { ChangePasswordComponent } from './view/change-password/change-password.component';
import { MsComponent } from './view/ms/ms.component';


const routes: Routes =[
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sigup', component: SigupComponent},
  {path: 'user', component: UserComponent},
  {path: 'MI/:Titulo', component: MiComponent },
  {path: 'MS/:titulo', component: MsComponent },
  {path: 'change-password', component: ChangePasswordComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigupComponent,
    MiComponent,
    HomeComponent,
    UserComponent,
    FooterComponent,
    NavComponent,
    ChangePasswordComponent,
    MsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
