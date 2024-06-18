import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ExportCSVOptions, TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {Table} from "@app/_models";
import {QueryService} from "@app/_services";
import {filter} from "rxjs";
import {Table as PrimeNGTable} from "primeng/table/table";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {AlertListComponent} from "@app/analytics/alert-list/alert-list.component";

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

  table: Table = {
    tableName: "",
    columns: [],
    rows: [{'not selected': ""}],
    columnOptions: [],
    selectedColumns: [],
    selectedRows: []
  }
  loading: boolean = false;

  constructor(private queryService: QueryService) {
  }

  ngOnInit(): void {
    this.queryService.table
      .pipe(filter(table => table !== undefined))
      .subscribe(table => {
        if (table) {
          table.columnOptions = table.columns.map(col => ({
            field: col,
            header: col.charAt(0).toUpperCase() + col.slice(1)
          }));
          table.selectedColumns = [...table.columnOptions];
        }
        this.table = table!;
        this.loading = false;
      });
  }

  reload(): void {
    this.queryService.sendQuery();
  }

  clear(dt: PrimeNGTable): void {
    dt.reset();
  }

  save(dt: PrimeNGTable, options: ExportCSVOptions): void {
    dt.exportCSV(options);
  }

}
