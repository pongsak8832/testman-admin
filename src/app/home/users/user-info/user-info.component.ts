import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from 'src/app/model/user.model';
import { RolesService } from 'src/app/service/roles.service';
import { UserService } from 'src/app/service/user.service';
import { ModalService } from 'src/app/service/modal.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  appearance = 'outline';
  isLoading = false;
  isEdit = false;
  isCanSave = false;

  emailControl = new FormControl('', Validators.email);
  userModel: UserModel = UserModel.empty();
  roleList = [];

  constructor(public _dialogRef: MatDialogRef<UserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _roleSerive: RolesService,
    private _userService: UserService,
    private _modalService: ModalService) { }

  ngOnInit() {
    this.getRole();
    if (!!this._data.data) {
      this.getUserById();
      this.isEdit = true;
    }
  }

  getRole(): void {
    this._roleSerive.getData().subscribe(_data => {
      this.roleList = _data;
    });
  }

  getUserById(): void {
    this.isLoading = true;
    this._userService.getDataById(this._data.data.uid).subscribe(_data => {
      this.userModel = _data;
      this.emailControl.setValue(this.userModel.email);
      this.isLoading = false;
    },
    _err => {
      this.isLoading = false;
      this._modalService.error(_err.message.toString());
    });
  }

  createUser(): void {
    this._modalService.confirms().then(_allow => {
      if (!_allow.value) {
        return;
      }
      this.isLoading = true;
      this.userModel.uid = this._userService.getId();
      this._userService.createUserBytEmail(this.userModel.email)
        .toPromise()
        .then(async (createUser) => {
          if (createUser.status === 200) {
            this._userService.addItem(this.userModel).then(async () => {
              await this._userService.sendResetEmail(this.userModel);
              this._modalService.warning(`สร้าง รหัสผ่านที่ email: ${this.userModel.email}`);
              this.isLoading = false;
              this._dialogRef.close();
              this._modalService.success();
            }).catch((_err) => {
              this.isLoading = false;
              this._modalService.error(_err.message.toString());
            });
          } else {
            this.isLoading = false;
          }
        }).catch((_err) => {
          this.isLoading = false;
          this._modalService.error(_err.message.toString());
        });
    });

  }

  updateUser(): void {
    this._modalService.confirms().then(_allow => {
      if (!_allow.value) {
        return;
      }
      this.isLoading = true;
      this._userService.updateItem(this.userModel).then(() => {
        this.isLoading = false;
        this._dialogRef.close();
        this._modalService.success();
      }).catch(_err => {
        this.isLoading = false;
        this._modalService.error(_err.message.toString());
      });
    });

  }

  onCheckCanSave(): void { 
    this.isCanSave = !!this.userModel.name &&
      !!this.emailControl.valid &&
      !!this.userModel.roleId;

      this.userModel.email = this.emailControl.value;
  }

  onSave(): void {
    if (this.isEdit) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }



}
