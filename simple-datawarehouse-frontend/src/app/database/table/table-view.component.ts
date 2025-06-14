import {Component} from '@angular/core';
import {TableService} from '@app/_services';
import {Table} from '@app/_models';
import {NgForOf, NgIf} from '@angular/common';
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TableModule
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css',
})
export class TableViewComponent {
  table!: Table;

  constructor(private tableService: TableService) {
    this.tableService.table$.subscribe((table: Table | undefined) => {
      if (table) {
        this.table = table;
        console.log(table.columnList);
      }
    });
  }

}
