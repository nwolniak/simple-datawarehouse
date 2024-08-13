import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {Query, TableMetadata} from "@app/_models";
import {QueryService} from "@app/_services";
import {TableSelectedService} from "@app/_services/table-selected.service";
import {JoinedTablesService} from "@app/_services/joined-tables.service";

@Component({
  selector: 'app-group-by',
  standalone: true,
  imports: [
    DropdownModule,
    PrimeTemplate,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './group-by.component.html',
  styleUrl: './group-by.component.css'
})
export class GroupByComponent implements OnInit {

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

  groupByChange(column: string, index: number) {
    this.query.groupByList[index] = column
    this.queryService.updateQuery(this.query)
  }

  deleteGroupBy(index: number) {
    this.query.groupByList.splice(index, 1)
    this.queryService.updateQuery(this.query)
  }

  newGroupBy() {
    this.query.groupByList.push(" ")
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
