import { Component, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatasourceService, TableService } from '@app/_services';
import { TableRow } from '@app/_models';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    NgIf,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatPaginator,
    MatColumnDef,
    MatHeaderCellDef,
    NgForOf,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatCellDef,
    MatRowDef,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css',
})
export class TableViewComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  columns?: string[];
  dataSource: MatTableDataSource<TableRow> = new MatTableDataSource<TableRow>(
    [],
  );

  constructor(
    private tableService: TableService,
    private datasourceService: DatasourceService,
  ) {
    this.tableService.table.subscribe((table) => {
      if (table) {
        this.columns = table.columns;
      }
    });
    this.datasourceService.datasource.subscribe((datasource) => {
      if (datasource) {
        this.dataSource = datasource;
        this.updatePaginator();
      }
    });
  }

  updatePaginator(): void {
    if (!this.paginator) {
      setTimeout(() => {
        this.updatePaginator();
      }, 100);
      return;
    }
    this.dataSource.paginator = this.paginator;
  }
}
