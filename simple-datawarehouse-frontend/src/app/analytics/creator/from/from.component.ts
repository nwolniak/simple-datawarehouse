import { Component } from '@angular/core';
import { TableMetadata } from '@app/_models';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { BaseCreatorComponent } from '@app/analytics/creator/base-creator/base-creator.component';

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [PaginatorModule, ToolbarModule],
  templateUrl: './from.component.html',
  styleUrl: './from.component.css',
})
export class FromComponent extends BaseCreatorComponent {
  fromTableChange(table: TableMetadata | undefined) {
    if (!table) {
      return;
    }
    this.tableSelectedService.changeTable(table);
    this.query.fromTable = table.tableName;
    this.queryService.updateQuery(this.query);
  }
}
