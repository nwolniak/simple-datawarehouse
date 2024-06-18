import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {Metadata, Query, TableMetadata} from "@app/_models";
import {MetadataService, QueryService} from "@app/_services";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {query} from "@angular/animations";
import {ScrollPanelModule} from "primeng/scrollpanel";

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    DropdownModule,
    MultiSelectModule,
    NgIf,
    PaginatorModule,
    NgForOf,
    InputTextModule,
    FloatLabelModule,
    TableModule,
    ToggleButtonModule,
    ScrollPanelModule
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.css'
})
export class CreatorComponent implements OnInit {

  metadata: any = {};
  query!: Query
  joinTypes: string[] = ["INNER", "LEFT", "RIGHT", "FULL", "CROSS", "SELF"];
  operators: string[] = ["=", "<>", ">", ">=", "<", "<="];
  aggregates: string[] = ["COUNT", "SUM", "AVG", "MAX", "MIN"];

  fromTable?: TableMetadata;
  joinTables: TableMetadata[] = [];

  constructor(
    private metadataService: MetadataService,
    private queryService: QueryService) {
  }

  ngOnInit(): void {
    this.metadataService.metadata.subscribe(metadata => this.metadata = metadata);
    this.queryService.query.subscribe(query => this.query = query);
  }

  updateQuery() {
    this.queryService.updateQuery(this.query);
  }

  fromTableChange(table: TableMetadata | undefined) {
    if (!table) {
      return
    }
    this.query.fromTable = table.tableName;
    this.queryService.updateQuery(this.query);
  }

  leftOperands(): string[] {
    let columnOptions: string[] = [];
    if (!this.fromTable) {
      return columnOptions;
    }
    this.fromTable.columnsMetadata
      .map(columnMetadata => this.fromTable?.tableName + "." + columnMetadata.name)
      .forEach(columnOption => columnOptions.push(columnOption));
    return columnOptions;
  }

  rightOperands(index: number): string[] {
    let columnOptions: string[] = [];
    if (!this.joinTables[index]) {
      return columnOptions;
    }
    this.joinTables[index].columnsMetadata
      .map(columnMetadata => this.joinTables[index].tableName + "." + columnMetadata.name)
      .forEach(columnOption => columnOptions.push(columnOption));
    return columnOptions;
  }

  newJoinTable() {
    this.query.joins.push({table: "", type: "", conditions: [{leftOperand: "", operator: "", rightOperand: ""}]});
    this.queryService.updateQuery(this.query);
  }

  deleteJoinTable(index: number) {
    this.joinTables.splice(index, 1);
    this.query.joins.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  joinTableChange(table: TableMetadata | undefined, index: number) {
    if (!table) {
      return
    }
    if (this.joinTables.length == index) {
      this.joinTables.push(table);
    } else {
      this.joinTables[index] = table;
    }
    this.query.joins[index].table = table.tableName;
    this.queryService.updateQuery(this.query);
  }

  columnOptions(): string[] {
    let columnOptions: string[] = [];
    if (this.fromTable) {
      this.fromTable.columnsMetadata
        .map(columnMetadata => this.fromTable?.tableName + "." + columnMetadata.name)
        .forEach(columnOption => columnOptions.push(columnOption));
    }
    this.joinTables
      .forEach(joinTable => joinTable.columnsMetadata
        .map(columnMetadata => joinTable.tableName + "." + columnMetadata.name)
        .forEach(columnOption => columnOptions.push(columnOption)));
    return columnOptions;
  }

  newColumn() {
    this.query.columns.push({name: "", alias: "", function: ""});
    this.queryService.updateQuery(this.query);
  }

  deleteColumn(index: number) {
    this.query.columns.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  columnChange(column: string, index: number) {
    this.query.columns[index].name = column;
    this.queryService.updateQuery(this.query);
  }

  aliasChange($event: Event, index: number) {
    this.query.columns[index].alias = ($event.target as HTMLInputElement).value;
    this.queryService.updateQuery(this.query);
  }

  aggregateChange(aggregate: string, index: number) {
    this.query.columns[index].function = aggregate;
    this.queryService.updateQuery(this.query);
  }

  groupByChange(column: string, index: number) {
    this.query.groupByList[index] = column;
    this.queryService.updateQuery(this.query)
  }

  newGroupBy() {
    this.query.groupByList.push(" ");
    this.queryService.updateQuery(this.query);
  }

  deleteGroupBy(index: number) {
    this.query.groupByList.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  orderByColumnChange(column: string, index: number) {
    this.query.orderByList[index].columnName = column;
    this.queryService.updateQuery(this.query);
  }

  newOrderBy() {
    this.query.orderByList.push({columnName: "", ascending: true});
    this.queryService.updateQuery(this.query);
  }

  deleteOrderBy(index: number) {
    this.query.orderByList.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

}
