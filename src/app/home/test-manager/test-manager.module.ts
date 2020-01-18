import { NgModule } from '@angular/core';

import { PageTestRoutingModule } from './test-manager-routing.module';
import { TestManagerListComponent } from './test-manager-list/test-manager-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TestManagerListComponent,
  ],
  imports: [
    SharedModule,
    PageTestRoutingModule

  ]
})
export class TestManagerModule { }
