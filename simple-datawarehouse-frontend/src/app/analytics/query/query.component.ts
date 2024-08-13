import {Component, OnInit} from '@angular/core';
import {Metadata, Query, TableMetadata} from "@app/_models";
import {MetadataService, QueryService} from "@app/_services";
import {TableSelectedService} from "@app/_services/table-selected.service";
import {JoinedTablesService} from "@app/_services/joined-tables.service";

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent implements OnInit {

  metadata?: Metadata
  query!: Query
  fromTable?: TableMetadata
  joinedTables!: TableMetadata[]

  constructor(
    protected metadataService: MetadataService,
    protected queryService: QueryService,
    protected tableSelectedService: TableSelectedService,
    protected joinedTablesService: JoinedTablesService) {
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

}
