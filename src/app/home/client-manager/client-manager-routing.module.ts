import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientManagerListComponent } from './client-manager-list/client-manager-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: ClientManagerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagerRoutingModule { }
