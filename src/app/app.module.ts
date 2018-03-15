import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GraphQlModule } from './shared/graphql.module';
import { CoreModule } from './core/core.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    GraphQlModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(ROUTES),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
