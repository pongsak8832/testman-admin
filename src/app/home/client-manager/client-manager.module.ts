import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManagerRoutingModule } from './client-manager-routing.module';
import { ClientManagerListComponent } from './client-manager-list/client-manager-list.component';
import { ClientManagerInfoComponent } from './client-manager-info/client-manager-info.component';

@NgModule({
  declarations: [ClientManagerListComponent, ClientManagerInfoComponent],
  imports: [
    SharedModule,
    ClientManagerRoutingModule
  ],
  entryComponents: [
    ClientManagerInfoComponent
  ]
})
export class ClientManagerModule { }
