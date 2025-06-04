import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {NgForOf, NgIf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {ExportCSVOptions, TableFilterEvent, TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {Condition, Query, Table} from '@app/_models';
import {QueryService} from '@app/_services';
import {Table as PrimeNGTable} from 'primeng/table/table';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {AlertListComponent} from '@app/analytics/table/alert-list/alert-list.component';
import {cloneDeep} from 'lodash-es';
import {QueryComponent} from '@app/analytics/table/query/query.component';
import {delay} from "rxjs";

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [
    Button,
    MultiSelectModule,
    NgForOf,
    NgIf,
    PrimeTemplate,
    TableModule,
    TooltipModule,
    PaginatorModule,
    DialogModule,
    AlertListComponent,
    QueryComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  table!: Table;
  query!: Query;
  tableQuery!: Query;
  loading: boolean = false;

  filtersMap: { [key: string]: string } = {
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
    equals: '=',
    notEquals: '!=',
    startsWith: 'startsWith',
    contains: 'contains',
    notContains: 'notContains',
    endsWith: 'endsWith',
  };

  savedFilters: any = {};

  constructor(private queryService: QueryService) {
    this.queryService.query.subscribe((query) => (this.query = query));
    this.queryService.tableQuery.subscribe((tableQuery) => {
      this.tableQuery = tableQuery;
      console.log(this.tableQuery);
      if (this.tableQuery.columnList.length > 0) {
        this.sendTableQuery();
      }
    });
    this.queryService.table.pipe(delay(250)).subscribe((table) => {
      this.table = table;
      if (this.query) {
        this.table.columnOptions = [...this.query.columnList];
        this.table.selectedColumns = [...this.tableQuery.columnList];
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.loadFilterState();
  }

  saveFilterState(event: TableFilterEvent) {
    const filters = event.filters;
    localStorage.setItem('tableFilters', JSON.stringify(filters));
  }

  loadFilterState() {
    const savedFilters = localStorage.getItem('tableFilters');
    if (savedFilters) {
      this.savedFilters = JSON.parse(savedFilters);
    }
  }

  removeFilterState() {
    this.savedFilters = {};
    localStorage.removeItem('tableFilters');
  }

  updateTableQuery() {
    this.queryService.updateTableQuery(this.tableQuery);
  }

  sendTableQuery() {
    this.queryService.sendTableQuery();
  }

  reload(): void {
    this.removeFilterState();
    this.tableQuery = cloneDeep(this.query);
    this.updateTableQuery();
  }

  clear(dt: PrimeNGTable): void {
    this.removeFilterState();
    dt.reset();
  }

  save(dt: PrimeNGTable, options: ExportCSVOptions): void {
    dt.columns = this.table.selectedColumns.map((col) => ({
      field: col.alias,
      header: col.alias,
    }));
    dt.exportCSV(options);
    dt.columns = this.table.selectedColumns;
  }

  columnOptionChange() {
    this.removeFilterState();
    const columns = [...this.table.selectedColumns];
    if (JSON.stringify(this.tableQuery.columnList) === JSON.stringify(columns)) {
      return;
    }
    this.tableQuery.columnList = columns;
    this.updateTableQuery();
  }

  columnOrderChange() {
    this.removeFilterState();
    const columns = [...this.table.selectedColumns];
    if (JSON.stringify(this.tableQuery.columnList) === JSON.stringify(columns)) {
      return;
    }
    this.tableQuery.columnList = columns;
    this.updateTableQuery();
  }

  onColumnFilter(event: TableFilterEvent) {
    this.saveFilterState(event);
    const whereList: Condition[] = [];
    const havingList: Condition[] = [];
    const filters = event.filters;
    if (!filters) {
      return;
    }
    this.tableQuery.columnList.forEach((column) => {
      if (!filters[column.alias]) {
        return;
      }
      // @ts-ignore
      const filter = filters[column.alias][0];
      const value = filter.value;
      const operator = filter.matchMode;
      if (!operator || !value) {
        return;
      }
      if (column.aggregate !== 'None') {
        havingList.push({
          leftOperand: column.name,
          operator: this.filtersMap[operator],
          rightOperand: value,
        });
      } else {
        whereList.push({
          leftOperand: column.name,
          operator: this.filtersMap[operator],
          rightOperand: value,
        });
      }
    });
    if (
      JSON.stringify(this.tableQuery.whereList) === JSON.stringify(whereList) &&
      JSON.stringify(this.tableQuery.havingList) === JSON.stringify(havingList)
    ) {
      return;
    }
    this.tableQuery.whereList = whereList;
    this.tableQuery.havingList = havingList;
    this.updateTableQuery();
  }

  columnType(column: string): string {
    const value = this.table.rowList[0][column];
    return this.isNumeric(value) ? 'numeric' : 'text';
  }

  private isNumeric(value: any): boolean {
    return typeof value === 'number';
  }
}
