import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillInComponent } from './fill-in/fill-in.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatFormFieldModule,
         MatInputModule,
         MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [FillInComponent],
  imports: [
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [
    FillInComponent,
  ],
  entryComponents: [
    FillInComponent
  ]
})
export class ComponentsModule { }
