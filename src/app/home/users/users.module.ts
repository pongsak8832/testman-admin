import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [UserListComponent, UserInfoComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  entryComponents: [
    UserInfoComponent
  ]
})
export class UsersModule { }
