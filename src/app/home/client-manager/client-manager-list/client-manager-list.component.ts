import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService, TdMediaService, ITdDataTableSortChangeEvent, IPageChangeEvent } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { ModalService } from 'src/app/service/modal.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { RolesService } from 'src/app/service/roles.service';
import {ClientManagerInfoComponent} from '../client-manager-info/client-manager-info.component';
import { ClientModel } from 'src/app/model/client.model';
import { ClientService } from 'src/app/service/client.service';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-client-manager-list',
  templateUrl: './client-manager-list.component.html',
  styleUrls: ['./client-manager-list.component.scss']
})
export class ClientManagerListComponent implements OnInit {

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: 'No.', width: 100 },
    { name: 'name', label: 'Name', filter: true, sortable: true, width: 200 },
    { name: 'email', label: 'Email', filter: true, sortable: true, },
    { name: 'organizationId', label: 'OrganizationId Name', filter: true, sortable: true, },
    { name: 'status', label: 'Status', width: 100 },
    { name: 'operation', label: '', width: 80 },
  ];

  data: ClientModel[] = [];
  isLoading = false;

  filteredData: ClientModel[] = this.data;
  filteredTotal: number = this.data.length;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 50;
  sortBy = 'id';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;


  constructor(private _dataTableService: TdDataTableService,
    public _media: TdMediaService,
    public _dialog: MatDialog,
    // private _clientService: UserService,
    private _clientService: ClientService,
    private _rolesService: RolesService,
    private _organizationService: OrganizationService,
    private _modalService: ModalService,
    public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this._clientService.getData().subscribe( _data => {
      this.data = _data;
      this.data.forEach( (_el: ClientModel, index: number) => {
        this._organizationService.getDataById(_el.organizationId).subscribe(_dataOrg => {
          this.data[index].organizationId = _dataOrg.name;
        },
        _err => {
          this.isLoading = false;
          this._modalService.error(_err.message.toString());
        });
      });
      this.filter();
      this.isLoading = false;
    },
    (_err) => {
      this.isLoading = false;
      this._modalService.error(_err.message.toString());
    });
  }

  onOpenUserInfo(row?: ClientModel): void {
    const dialogRef = this._dialog.open(ClientManagerInfoComponent, {
      width: '40%',
      disableClose: false,
      data: {
        data: !!row ? row : '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData = this.data;
    const excludedColumns: string[] = this.configWidthColumns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, false, excludedColumns);
    this.filteredTotal = newData.length;

    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);

    this.filteredData = newData;
  }

  active(data: ClientModel, status: string) {
    this.isLoading = true;
    data.status = status;
    this._clientService.updateStatus(data).then(() => {
      this.isLoading = false;
    }).catch((_err) => {
      this.isLoading = false;
    }).finally();
  }

  resetPassword(row: ClientModel): void {
    this._clientService.sendResetEmail(row);
  }

}
