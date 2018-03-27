import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GraphQlModule } from './graphql/graphql.module';
import { CoreModule } from './core/core.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserProfileModule } from './user-profile/user-profile.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';

const ROUTES: Routes = [
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => HomeModule
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    GraphQlModule,
    CoreModule,
    HomeModule,
    SharedModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
