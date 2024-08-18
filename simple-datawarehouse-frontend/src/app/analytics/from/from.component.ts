import {Component} from '@angular/core';
import {TableMetadata} from "@app/_models";
import {QueryComponent} from "@app/analytics/query/query.component";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [
    PaginatorModule,
    ToolbarModule
  ],
  templateUrl: './from.component.html',
  styleUrl: './from.component.css'
})
export class FromComponent extends QueryComponent {

  fromTableChange(table: TableMetadata | undefined) {
    if (!table) {
      return
    }
    this.tableSelectedService.changeTable(table);
    this.query.fromTable = table.tableName
    this.queryService.updateQuery(this.query)
  }

}
