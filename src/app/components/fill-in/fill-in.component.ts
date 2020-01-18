import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fill-in',
  templateUrl: './fill-in.component.html',
  styleUrls: ['./fill-in.component.scss']
})
export class FillInComponent implements OnInit {

  @Input() editorContent = '';
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangeEditor = new EventEmitter();
  appearance = 'outline';
  FillInComponent: any;

  public editorOptions: Object = {
    key: 'MZC1rF2H5I4D3A11A9iAd1Te1YZNYAc1CUKUEQOHFVANUqB2C1E7C7E1E5F4A1B3A11==',
    placeholderText: 'ข้อมูล (ภาษาอังกฤษ)',
    useClasses: false,
    events: {
      'contentChanged': () => {
        this.onChange();
      },
      'image.beforeUpload': function (files) {
        const editor = this;
        if (files.length) {

          const reader = new FileReader();
          reader.onload = function (e: any) {
            const result = e.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };
          reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        return false;
      }

    }
  };

  constructor() { }

  ngOnInit() {

  }

  onChange(): void {
    this.onChangeEditor.emit(this.editorContent);
  }

}
