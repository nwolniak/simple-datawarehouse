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
  table: Table = {
    tableName: "tableName",
    columnList: ["id", "name", "age", "email", "isActive"],
    rowList: [
      {id: 1, name: "Alice", age: 25, email: "alice@example.com", isActive: true},
      {id: 2, name: "Bob", age: 30, email: "bob@example.com", isActive: false},
      {id: 3, name: "Charlie", age: 28, email: "charlie@example.com", isActive: true},
      {id: 4, name: "David", age: 35, email: "david@example.com", isActive: false},
      {id: 5, name: "Eve", age: 22, email: "eve@example.com", isActive: true}
    ],
    columnOptions: [],
    selectedColumns: [],
    selectedRows: [],
    query: "query"
  };

  constructor(private tableService: TableService) {
    this.tableService.table.subscribe((table) => {
      if (table) {
        this.table = table;
        console.log(table.columnList);
      }
    });
  }

}
