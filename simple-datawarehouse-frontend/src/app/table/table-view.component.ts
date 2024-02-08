import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
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
  MatTableDataSource
} from "@angular/material/table";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    MatPaginator,
    MatPaginatorModule
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements AfterViewInit, OnChanges {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Input()
  columns!: string[];

  @Input()
  dataSource: MatTableDataSource<{ [key: string]: any }> = new MatTableDataSource<{ [key: string]: any }>([]);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      this.dataSource.paginator = this.paginator;
    }
  }

}
