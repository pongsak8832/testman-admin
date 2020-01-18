import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ITdDataTableColumn, IPageChangeEvent, ITdDataTableSortChangeEvent, TdDataTableSortingOrder, TdDataTableService, TdMediaService, TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/service/auth/auth.service';
import 'froala-editor/js/plugins.pkgd.min.js';
import { Router } from '@angular/router';
import { QuestionHDService  } from 'src/app/service/question-HD.service';
import { QuestionHDModel } from 'src/app/model/question-HD.model';
import { QuestionDTService } from 'src/app/service/question-DT.service';
import { ModalService } from 'src/app/service/modal.service';


@Component({
  selector: 'app-test-manager-list',
  templateUrl: './test-manager-list.component.html',
  styleUrls: ['./test-manager-list.component.scss']
})
export class TestManagerListComponent implements OnInit {

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: 'TM ID', width: 100 },
    { name: 'organizationId', label: 'Organization', filter: true, sortable: true, width: 200 },
    { name: 'clientRef', label: 'Client Ref', filter: true, sortable: true, width: 100 },
    { name: 'testName', label: 'Test Name', filter: true, sortable: true, },
    { name: 'questionQTY', label: 'Qestion QTY', filter: true, width: 100 },
    { name: 'score', label: 'Score', filter: true, sortable: true, width: 50 },
    { name: 'testingTime', label: 'Time (min)', filter: true, width: 70 },
    { name: 'tested', label: 'Tested', width: 50 },
    { name: 'status', label: 'Status', width: 120 },
  ];

  data: QuestionHDModel[] = [];
  isLoading = false;

  filteredData: QuestionHDModel[] = this.data;
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
    private _questionHDService: QuestionHDService,
    private _questionDTservice: QuestionDTService,
    private _modalService: ModalService,
    public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this._questionHDService.getData().subscribe( _data => {
      this.data = _data as QuestionHDModel[];
      this.data.forEach( (_el: QuestionHDModel, index: number) => {
        let sumScore = 0;
        this._questionDTservice.getData(_el.id).subscribe(_dataDT => {
          _dataDT.forEach(_elDT => {
            sumScore +=  _elDT.score;
          });
          this.data[index].score = sumScore + '';
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

  active(data: QuestionHDModel, status: string) {
    this.isLoading = true;
    data.status = status;
    this._questionHDService.updateItem(data).then(() => {
      this.isLoading = false;
    }).catch((_err) => {
      this.isLoading = false;
    }).finally();
  }

}
