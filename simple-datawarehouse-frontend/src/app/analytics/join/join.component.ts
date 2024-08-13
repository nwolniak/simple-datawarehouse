import {Component, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {Metadata, Query, TableMetadata} from "@app/_models";
import {MetadataService, QueryService} from "@app/_services";
import {PaginatorModule} from "primeng/paginator";
import {TableSelectedService} from "@app/_services/table-selected.service";
import {JoinedTablesService} from "@app/_services/joined-tables.service";

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    DataViewModule,
    DialogModule,
    NgForOf,
    PrimeTemplate,
    ToolbarModule,
    TooltipModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    NgIf
  ],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent implements OnInit {

  joinTypes: string[] = ["INNER", "LEFT", "RIGHT", "FULL", "CROSS", "SELF"]
  operators: string[] = ["=", "<>", ">", ">=", "<", "<="]

  metadata?: Metadata
  query!: Query
  fromTable?: TableMetadata
  joinedTables!: TableMetadata[]

  constructor(
    private metadataService: MetadataService,
    private queryService: QueryService,
    private tableSelectedService: TableSelectedService,
    private joinedTablesService: JoinedTablesService) {
  }

  ngOnInit(): void {
    this.metadataService.metadata.subscribe(metadata => this.metadata = metadata)
    this.queryService.query.subscribe(query => this.query = query)
    this.tableSelectedService.table.subscribe(table => this.fromTable = table)
    this.joinedTablesService.joinedTables.subscribe(joinedTables => this.joinedTables = joinedTables)
  }

  updateQuery() {
    this.queryService.updateQuery(this.query)
  }

  joinTableOptions(index: number): string[] {
    let columnOptions: string[] = []
    if (!this.metadata) {
      return columnOptions
    }
    const nonAvailableJoinTables = [
      ...this.query.joins.slice(0, index),
      ...this.query.joins.slice(index + 1)
    ]
    this.metadata.tables
      .filter(table => !nonAvailableJoinTables.map(join => join.table).includes(table.tableName))
      .filter(table => !(this.fromTable == table))
      .map(table => table.tableName)
      .forEach(tableName => columnOptions.push(tableName))
    return columnOptions;
  }

  joinedTableChange(tableName: string, index: number) {
    if (!this.metadata) {
      return;
    }
    const table = this.metadata.tables
      .find(table => table.tableName === tableName);
    if (!table) {
      return;
    }
    if (this.joinedTables.length == index) {
      this.joinedTables.push(table)
    } else {
      this.joinedTables[index] = table
    }
    this.joinedTablesService.changeJoinedTables(this.joinedTables)
    this.query.joins[index].table = table.tableName
    this.queryService.updateQuery(this.query)
  }

  leftOperands(): string[] {
    let columnOptions: string[] = []
    if (!this.fromTable) {
      return columnOptions
    }
    this.fromTable.columnsMetadata
      .map(columnMetadata => this.fromTable?.tableName + "." + columnMetadata.name)
      .forEach(columnOption => columnOptions.push(columnOption))
    return columnOptions
  }

  rightOperands(index: number): string[] {
    let columnOptions: string[] = []
    if (!this.joinedTables[index]) {
      return columnOptions
    }
    this.joinedTables[index].columnsMetadata
      .map(columnMetadata => this.joinedTables[index].tableName + "." + columnMetadata.name)
      .forEach(columnOption => columnOptions.push(columnOption))
    return columnOptions
  }

  newJoinTable() {
    this.query.joins.push({table: "", type: "", conditions: [{leftOperand: "", operator: "", rightOperand: ""}]})
    this.queryService.updateQuery(this.query)
  }

  deleteJoinTable(index: number) {
    this.joinedTables.splice(index, 1);
    this.query.joins.splice(index, 1);
    this.joinedTablesService.changeJoinedTables(this.joinedTables);
    this.queryService.updateQuery(this.query);
  }

  buttonDisabled(): boolean {
    if (!this.metadata) {
      return true
    }
    if (!this.fromTable) {
      return true
    }
    if (this.query.joins.length > 0 && this.joinedTables.length < this.query.joins.length) {
      return true
    }
    const dimTables = new Map<string, any[]>(Object.entries(this.metadata.dimTables));
    if (this.joinedTables.length === dimTables.get(this.fromTable.tableName)?.length) {
      return true
    }
    return false
  }

}
