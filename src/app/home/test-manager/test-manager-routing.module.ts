import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestManagerListComponent } from './test-manager-list/test-manager-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: TestManagerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageTestRoutingModule { }
