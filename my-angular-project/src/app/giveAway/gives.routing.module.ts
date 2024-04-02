import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { AuthActivate } from '../core/guard/auth.activate';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'delete/:id',
    component: CatalogComponent,
    canActivate: [AuthActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GivesRoutingModule {}