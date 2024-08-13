import {Component} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {TableMetadata} from "@app/_models";
import {PaginatorModule} from "primeng/paginator";
import {QueryComponent} from "@app/analytics/query/query.component";

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [
    DropdownModule,
    PaginatorModule
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
