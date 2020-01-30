import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService, TdMediaService, ITdDataTableSortChangeEvent, IPageChangeEvent } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { QuestionHDService } from 'src/app/service/question-HD.service';
import { ModalService } from 'src/app/service/modal.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import {UserInfoComponent} from '../user-info/user-info.component';
import { UserService } from 'src/app/service/user.service';
import { UserModel } from 'src/app/model/user.model';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: 'No.', width: {min: 100, max:100 } },
    { name: 'name', label: 'Name', filter: true, sortable: true, width: {min: 250, max:250 } },
    { name: 'email', label: 'Email', filter: true, sortable: true, },
    { name: 'createDate', label: 'Member Since', filter: true, width: {min: 150, max:150 } },
    { name: 'roleId', label: 'roleId', filter: true, width: {min: 150, max:150 } },
    { name: 'status', label: 'Status', width: {min: 150, max:150 } },
    { name: 'operation', label: '', width: {min: 80, max:80 } },
  ];

  columnDefs: [
    { className: "dt-center", targets: [ 0, 1, 2 ] }
  ]

  data: UserModel[] = [];
  isLoading = false;

  filteredData: UserModel[] = this.data;
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
    private _userService: UserService,
    private _rolesService: RolesService,
    private _modalService: ModalService,
    public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this._userService.getData().subscribe( _data => {
      this.data = _data as UserModel[];
      this.data.forEach( (_el: UserModel, index: number) => {
        this._rolesService.getDataRoleId(_el.roleId).subscribe(_dataRole => {
          this.data[index].roleId = _dataRole[0].name;
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

  onOpenInfo(row?: UserModel): void {
    const dialogRef = this._dialog.open(UserInfoComponent, {
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

  active(data: UserModel, status: string) {
    this.isLoading = true;
    data.status = status;
    this._userService.updateStatus(data).then(() => {
      this.isLoading = false;
    }).catch((_err) => {
      this.isLoading = false;
    }).finally();
  }

  resetPassword(row: UserModel): void {
    this._userService.sendResetEmail(row);
  }

}
