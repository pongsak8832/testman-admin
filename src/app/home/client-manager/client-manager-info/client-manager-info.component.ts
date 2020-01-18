import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalService } from 'src/app/service/modal.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/internal/operators';
import { OrganizationModel } from 'src/app/model/organization.model';
import { OrganizationService } from 'src/app/service/organization.service';
import { ClientModel } from 'src/app/model/client.model';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-client-manager-info',
  templateUrl: './client-manager-info.component.html',
  styleUrls: ['./client-manager-info.component.scss']
})
export class ClientManagerInfoComponent implements OnInit {
  appearance = 'outline';
  isLoading = false;
  isEdit = false;
  isCanSave = false;

  clientModel: ClientModel = ClientModel.empty();

  emailControl = new FormControl('', Validators.email);
  organizationControl = new FormControl();
  options: OrganizationModel[] = [];
  filteredOptions: Observable<any[]>;

  constructor(public _dialogRef: MatDialogRef<ClientManagerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _organizationService: OrganizationService,
    private _clientService: ClientService,
    private _modalService: ModalService) { }

  ngOnInit() {
    this.getOrganization();
    if (!!this._data.data) {
      this.isEdit = true;
      this.getUserById();
    }

    this.filteredOptions = this.organizationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn = (organization?: OrganizationModel): string | undefined => {
    if (typeof organization.id !== 'undefined') {
      this.onCheckCanSave();
      this.clientModel.organizationId = organization.id;
    }

    return organization ? organization.name : undefined;
  }

  private _filter(name: string): OrganizationModel[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  bindDefaultAutocomplete(): void {
    this._organizationService.getDataById(this.clientModel.organizationId).subscribe(_data => {
      this.organizationControl.setValue({ name: _data.name });
    },
      _err => {
        this._modalService.error(_err.message.toString());
      });
  }

  getOrganization(): void {
    this._organizationService.getData().subscribe(_data => {
      this.options = _data;
    });
  }

  getUserById(): void {
    this._clientService.getDataById(this._data.data.uid).subscribe(_data => {
      this.clientModel = _data;
      this.emailControl.setValue(this.clientModel.email);
      this.bindDefaultAutocomplete();
    });
  }

  createClient(): void {
    this._modalService.confirms().then(_allow => {
      if (!_allow.value) {
        return;
      }
      this.isLoading = true;
      this._clientService.createUserBytEmail(this.clientModel.email)
        .toPromise()
        .then(async (createUser) => {
          if (createUser.status === 200) {
            this.clientModel.uid = this._clientService.getId();
            this._clientService.addItem(this.clientModel).then(async () => {
              await this._clientService.sendResetEmail(this.clientModel);
              this._modalService.warning(`สร้าง รหัสผ่านที่ email: ${this.clientModel.email}`);
              this.isLoading = false;
              this._dialogRef.close();
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

  updateClient(): void {
    this._modalService.confirms().then((_allow) => {
      if (!_allow.value) {
        return;
      }
      this.isLoading = true;

      this._clientService.updateItem(this.clientModel).then(() => {
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
    this.isCanSave = !!this.clientModel.name &&
                     this.emailControl.valid &&
                     !!this.clientModel.organizationId;

    this.clientModel.email = this.emailControl.value;

  }

  onSave(): void {
    if (this.isEdit) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }



}
