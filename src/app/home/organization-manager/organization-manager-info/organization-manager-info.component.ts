import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalService } from 'src/app/service/modal.service';
import { OrganizationService } from 'src/app/service/organization.service';
import { OrganizationModel } from 'src/app/model/organization.model';

@Component({
  selector: 'app-organization-manager-info',
  templateUrl: './organization-manager-info.component.html',
  styleUrls: ['./organization-manager-info.component.scss']
})
export class OrganizationManagerInfoComponent implements OnInit {
  appearance = 'outline';
  isLoading = false;
  isEdit = false;
  isCanSave = false;

  organizationModel: OrganizationModel = OrganizationModel.empty();
  roleList = [];

  constructor(public _dialogRef: MatDialogRef<OrganizationManagerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _organizationService: OrganizationService,
    private _modalService: ModalService) { }

  ngOnInit() {
    if (!!this._data.data) {
      this.isEdit = true;
      this.getUserById();
    }
  }

  getUserById(): void {
    this._organizationService.getDataById(this._data.data.id).subscribe(_data => {
      this.organizationModel = _data;
    });
  }

  createOrganization(): void {
    this._modalService.confirms().then(_allow => {
      if (!_allow.value) {
        return;
      }

      this.isLoading = true;
      this.organizationModel.id = this._organizationService.getId();
      this._organizationService.addItem(this.organizationModel).then(() => {
        this.isLoading = false;
        this._dialogRef.close();
        this._modalService.success();
      }).catch(_err => {
        this.isLoading = false;
        this._modalService.error(_err.message.toString());
      });
    });
  }

  updateOrganization(): void {
    this._modalService.confirms().then(_allow => {
      if (!_allow.value) {
        return;
      }
      this.isLoading = true;
      this._organizationService.updateItem(this.organizationModel).then(() => {
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
    this.isCanSave = !!this.organizationModel.name;
  }

  onSave(): void {
    if (this.isEdit) {
      this.updateOrganization();
    } else {
      this.createOrganization();
    }
  }



}
