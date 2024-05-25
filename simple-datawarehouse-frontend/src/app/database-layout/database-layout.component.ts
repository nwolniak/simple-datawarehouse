import {Component} from '@angular/core';
import {TableViewComponent} from "@app/table";
import {NgIf} from "@angular/common";
import {ConsoleComponent} from "@app/console";
import {DatasourceWindowComponent} from "@app/datasource";
import {DatasourceListComponent} from "@app/database-layout/datasource-layout/datasource-list.component";

@Component({
  selector: 'app-database-layout',
  standalone: true,
  imports: [
    DatasourceWindowComponent,
    TableViewComponent,
    NgIf,
    ConsoleComponent,
    DatasourceWindowComponent,
    DatasourceListComponent
  ],
  templateUrl: './database-layout.component.html',
  styleUrl: './database-layout.component.css'
})
export class DatabaseLayoutComponent {

}
