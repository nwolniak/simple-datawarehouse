import { Component, OnInit } from '@angular/core';
import { Metadata, Query, TableMetadata } from '@app/_models';
import { MetadataService, QueryService } from '@app/_services';
import { TableSelectedService } from '@app/_services/table-selected.service';
import { JoinedTablesService } from '@app/_services/joined-tables.service';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [],
  templateUrl: './base-creator.component.html',
  styleUrl: './base-creator.component.css',
})
export class BaseCreatorComponent implements OnInit {
  aggregates: string[] = ['None', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'];

  metadata?: Metadata;
  query!: Query;
  fromTable?: TableMetadata;
  joinedTables!: TableMetadata[];

  constructor(
    protected metadataService: MetadataService,
    protected queryService: QueryService,
    protected tableSelectedService: TableSelectedService,
    protected joinedTablesService: JoinedTablesService,
  ) {}

  ngOnInit(): void {
    this.metadataService.metadata.subscribe(
      (metadata) => (this.metadata = metadata),
    );
    this.queryService.query.subscribe((query) => (this.query = query));
    this.tableSelectedService.table.subscribe(
      (table) => (this.fromTable = table),
    );
    this.joinedTablesService.joinedTables.subscribe(
      (joinedTables) => (this.joinedTables = joinedTables),
    );
  }

  updateQuery() {
    this.queryService.updateQuery(this.query);
  }

  columnOptions(index: number): string[] {
    let columnOptions: string[] = [];
    const nonAvailableColumnOptions = [
      ...this.query.columns.slice(0, index),
      ...this.query.columns.slice(index + 1),
    ];
    if (this.fromTable) {
      this.fromTable.columnsMetadata
        .map(
          (columnMetadata) =>
            this.fromTable?.tableName + '.' + columnMetadata.name,
        )
        .filter(
          (column) =>
            !nonAvailableColumnOptions
              .map((column) => column.name)
              .includes(column),
        )
        .forEach((column) => columnOptions.push(column));
    }
    this.joinedTables.forEach((joinTable) =>
      joinTable.columnsMetadata
        .map(
          (columnMetadata) => joinTable.tableName + '.' + columnMetadata.name,
        )
        .filter(
          (column) =>
            !nonAvailableColumnOptions
              .map((column) => column.name)
              .includes(column),
        )
        .forEach((columnOption) => columnOptions.push(columnOption)),
    );
    return columnOptions;
  }
}
