import {Component, ViewChild} from '@angular/core';
import {TableQueryService} from '@app/_services';
import {Query, Table, TableMetadata} from '@app/_models';
import {Table as PrimeTable, TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {filter} from "rxjs";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css',
})
export class TableViewComponent {

  @ViewChild('primeTable') primeTable!: PrimeTable;

  tableMetadata!: TableMetadata;
  table!: Table | null;
  rows: number = 20;
  totalRecords!: number;
  loading: boolean = false;

  constructor(private tableService: TableQueryService) {
    this.tableService.tableMetadata$
      .pipe(
        filter((tableMetadata: TableMetadata | null): tableMetadata is TableMetadata => !!tableMetadata)
      )
      .subscribe((tableMetadata: TableMetadata) => {
        this.tableMetadata = tableMetadata;
        let query: Query = this.tableService.prepareQuery(this.tableMetadata, 1, this.rows);
        this.tableService.setQuery(query);
      });
    this.tableService.table$
      .subscribe((table: Table | null) => {
        if (!table) {
          this.table = table;
          return;
        }
        if (!this.table || !this.primeTable) {
          this.table = table;
          this.totalRecords = table.totalRecords;
          this.loading = false;
          return;
        }
        if (this.table.tableName !== table.tableName) {
          this.table = table;
          this.totalRecords = table.totalRecords;
          this.primeTable.reset();
          this.primeTable.resetScrollTop();
          this.loading = false;
          return;
        }
        this.table = table;
        this.totalRecords = table.totalRecords;
        this.loading = false;
      });
  }

  loadPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageNumber: number = Math.ceil((event.first! + 1) / event.rows!);
    const pageSize: number = event.rows!;
    let query = this.tableService.prepareQuery(this.tableMetadata, pageNumber, pageSize);
    this.tableService.setQuery(query);
  }

}
