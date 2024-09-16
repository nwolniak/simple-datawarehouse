import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ExportCSVOptions, TableFilterEvent, TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {Having, Query, Table, Where} from "@app/_models";
import {QueryService} from "@app/_services";
import {Table as PrimeNGTable} from "primeng/table/table";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {AlertListComponent} from "@app/analytics/alert-list/alert-list.component";
import _ from "lodash";

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
    AlertListComponent
  ],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css'
})
export class ResultTableComponent implements OnInit {

  table!: Table
  query!: Query
  tableQuery!: Query
  loading: boolean = true

  filtersMap: { [key: string]: string } = {
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
    equals: "=",
    notEquals: "!=",
    startsWith: "startsWith",
    contains: "contains",
    notContains: "notContains",
    endsWith: "endsWith"
  }

  savedFilters: any = {};

  constructor(private queryService: QueryService) {
    this.queryService.query.subscribe(query => this.query = query)
    this.queryService.tableQuery.subscribe(tableQuery => {
      this.tableQuery = tableQuery
      console.log(this.tableQuery)
      if (this.tableQuery.columns.length > 0) {
        this.sendTableQuery()
      }
    })
    this.queryService.table.subscribe(table => {
      this.table = table
      if (this.query) {
        this.table.columnOptions = [...this.query.columns]
        this.table.selectedColumns = [...this.tableQuery.columns]
      }
      this.loading = false
    })
  }

  ngOnInit(): void {
    this.loadFilterState();
    this.loading = false;
  }

  saveFilterState(event: TableFilterEvent) {
    const filters = event.filters
    localStorage.setItem("tableFilters", JSON.stringify(filters))
  }

  loadFilterState() {
    const savedFilters = localStorage.getItem("tableFilters")
    if (savedFilters) {
      this.savedFilters = JSON.parse(savedFilters);
    }
  }

  removeFilterState() {
    this.savedFilters = {}
    localStorage.removeItem("tableFilters")
  }

  updateTableQuery() {
    this.queryService.updateTableQuery(this.tableQuery)
  }

  sendTableQuery() {
    this.queryService.sendTableQuery()
  }

  reload(): void {
    this.loading = true
    this.removeFilterState()
    this.tableQuery = _.cloneDeep(this.query)
    this.updateTableQuery()
  }

  clear(dt: PrimeNGTable): void {
    this.removeFilterState()
    dt.reset()
  }

  save(dt: PrimeNGTable, options: ExportCSVOptions): void {
    dt.exportCSV(options)
  }

  columnOptionChange() {
    this.loading = true
    this.removeFilterState()
    const columns = [...this.table.selectedColumns]
    if (JSON.stringify(this.tableQuery.columns) === JSON.stringify(columns)) {
      return
    }
    this.tableQuery.columns = columns
    this.updateTableQuery()
  }

  columnOrderChange() {
    this.loading = true
    this.removeFilterState()
    const columns = [...this.table.selectedColumns]
    if (JSON.stringify(this.tableQuery.columns) === JSON.stringify(columns)) {
      return
    }
    this.tableQuery.columns = columns
    this.updateTableQuery()
  }

  onColumnFilter(event: TableFilterEvent) {
    this.saveFilterState(event)
    const whereList: Where[] = []
    const havingList: Having[] = []
    const filters = event.filters
    if (!filters) {
      return
    }
    this.tableQuery.columns.forEach(column => {
      if (!filters[column.alias]) {
        return
      }
      // @ts-ignore
      const filter = filters[column.alias][0]
      const value = filter.value
      const operator = filter.matchMode
      if (!operator || !value) {
        return;
      }
      if (column.function.length > 0) {
        havingList.push({columnName: column.name, operator: this.filtersMap[operator], value: value})
      } else {
        whereList.push({columnName: column.name, operator: this.filtersMap[operator], value: value})
      }
    })
    if (JSON.stringify(this.tableQuery.whereList) === JSON.stringify(whereList) &&
      JSON.stringify(this.tableQuery.havingList) === JSON.stringify(havingList)) {
      return
    }
    this.tableQuery.whereList = whereList
    this.tableQuery.havingList = havingList
    this.updateTableQuery()
  }

  private isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value))
  }

  columnType(column: string): string {
    const value = this.table.rows[0][column]
    return this.isNumeric(value) ? "numeric" : "text"
  }

}
