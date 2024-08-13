import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Query, TableMetadata} from "@app/_models";
import {QueryService} from "@app/_services";
import {TableSelectedService} from "@app/_services/table-selected.service";
import {JoinedTablesService} from "@app/_services/joined-tables.service";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {

  aggregates: string[] = ["COUNT", "SUM", "AVG", "MAX", "MIN"]

  query!: Query
  fromTable?: TableMetadata
  joinedTables!: TableMetadata[]

  constructor(
    private queryService: QueryService,
    private tableSelectedService: TableSelectedService,
    private joinedTablesService: JoinedTablesService
  ) {
  }

  ngOnInit(): void {
    this.queryService.query.subscribe(query => this.query = query)
    this.tableSelectedService.table.subscribe(table => this.fromTable = table)
    this.joinedTablesService.joinedTables.subscribe(joinedTables => this.joinedTables = joinedTables)
  }

  updateQuery() {
    this.queryService.updateQuery(this.query)
  }

  columnOptions(index: number): string[] {
    let columnOptions: string[] = []
    const nonAvailableColumnOptions = [
      ...this.query.columns.slice(0, index),
      ...this.query.columns.slice(index + 1)
    ]
    if (this.fromTable) {
      this.fromTable.columnsMetadata
        .map(columnMetadata => this.fromTable?.tableName + "." + columnMetadata.name)
        .filter(column => !nonAvailableColumnOptions.map(column => column.name).includes(column))
        .forEach(column => columnOptions.push(column))
    }
    this.joinedTables
      .forEach(joinTable => joinTable.columnsMetadata
        .map(columnMetadata => joinTable.tableName + "." + columnMetadata.name)
        .filter(column => !nonAvailableColumnOptions.map(column => column.name).includes(column))
        .forEach(columnOption => columnOptions.push(columnOption)))
    return columnOptions
  }

  columnChange(column: string, index: number) {
    this.query.columns[index].name = column
    this.queryService.updateQuery(this.query)
  }

  aliasChange($event: Event, index: number) {
    this.query.columns[index].alias = ($event.target as HTMLInputElement).value
    this.queryService.updateQuery(this.query)
  }

  aggregateChange(aggregate: string, index: number) {
    this.query.columns[index].function = aggregate
    this.queryService.updateQuery(this.query)
  }

  deleteColumn(index: number) {
    this.query.columns.splice(index, 1)
    this.queryService.updateQuery(this.query)
  }

  newColumn() {
    this.query.columns.push({name: "", alias: "", function: ""})
    this.queryService.updateQuery(this.query)
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true
    }
    if (this.query.columns.length > 0 && this.query.columns[this.query.columns.length - 1].name === '') {
      return true
    }
    const fromTableItems = this.fromTable.columnsMetadata.length
    const joinedTablesItems = this.joinedTables
      .map(table => table.columnsMetadata.length)
      .reduce((acc, i) => acc + i, 0)
    if (this.query.columns.length === (fromTableItems + joinedTablesItems)) {
      return true
    }
    return false
  }

}
