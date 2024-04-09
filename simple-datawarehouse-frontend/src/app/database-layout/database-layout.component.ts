import {Component} from '@angular/core';
import {DatasourceWindowComponent} from "@app/database-layout/datasource-layout/datasource-window.component";
import {TableViewComponent} from "@app/table";
import {TableService} from "@app/_services";
import {first} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Table} from "@app/_models";
import {NgIf} from "@angular/common";
import {ConsoleComponent} from "@app/console";

@Component({
  selector: 'app-database-layout',
  standalone: true,
  imports: [
    DatasourceWindowComponent,
    TableViewComponent,
    NgIf,
    ConsoleComponent
  ],
  templateUrl: './database-layout.component.html',
  styleUrl: './database-layout.component.css'
})
export class DatabaseLayoutComponent {

  table!: Table;
  dataSource!: MatTableDataSource<{ [p: string]: any }>

  constructor(private tableService: TableService) {
  }

  handleTableChosenEvent(table: string) {
    this.tableService.getTable(table)
      .pipe(first())
      .subscribe(table => {
        this.table = table;
        this.dataSource = new MatTableDataSource<{ [p: string]: any }>(this.table.rows);
      });
  }

}
