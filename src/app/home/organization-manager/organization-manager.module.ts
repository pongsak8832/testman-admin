import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationManagerInfoComponent } from './organization-manager-info/organization-manager-info.component';
import { OrganizationManagerRoutingModule } from './organization-manager-routing.module';
import { OrganizationManagerListComponent } from './organization-manager-list/organization-manager-list.component';


@NgModule({
  declarations: [OrganizationManagerListComponent, OrganizationManagerInfoComponent],
  imports: [
    SharedModule,
    OrganizationManagerRoutingModule
  ],
  entryComponents: [
    OrganizationManagerInfoComponent
  ]
})
export class OrganizationManagerModule { }
