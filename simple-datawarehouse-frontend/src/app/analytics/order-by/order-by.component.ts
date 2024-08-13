import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Query, TableMetadata} from "@app/_models";
import {QueryService} from "@app/_services";
import {TableSelectedService} from "@app/_services/table-selected.service";
import {JoinedTablesService} from "@app/_services/joined-tables.service";

@Component({
  selector: 'app-order-by',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    ToggleButtonModule
  ],
  templateUrl: './order-by.component.html',
  styleUrl: './order-by.component.css'
})
export class OrderByComponent implements OnInit {

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

  orderByColumnChange(column: string, index: number) {
    this.query.orderByList[index].columnName = column
    this.queryService.updateQuery(this.query)
  }

  newOrderBy() {
    this.query.orderByList.push({columnName: "", ascending: true})
    this.queryService.updateQuery(this.query)
  }

  deleteOrderBy(index: number) {
    this.query.orderByList.splice(index, 1)
    this.queryService.updateQuery(this.query)
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true
    }
    if (!this.query.columns[0]) {
      return true
    }
    if (this.query.columns[0].name === '') {
      return true
    }
    return false
  }

}
