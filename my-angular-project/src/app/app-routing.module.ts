import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './giveAway/catalog/catalog.component';
import { CreateComponent } from './giveAway/create/create.component';
import { DetailsComponent } from './giveAway/details/details.component';
import { EditComponent } from './giveAway/edit/edit.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }