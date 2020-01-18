import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationManagerListComponent } from './organization-manager-list/organization-manager-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: OrganizationManagerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationManagerRoutingModule { }
