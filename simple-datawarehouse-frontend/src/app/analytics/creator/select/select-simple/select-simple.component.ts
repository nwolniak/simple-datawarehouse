import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BaseCreatorComponent } from '@app/analytics/creator/base-creator/base-creator.component';

@Component({
  selector: 'app-select-simple',
  standalone: true,
  imports: [TableModule, PaginatorModule],
  templateUrl: './select-simple.component.html',
  styleUrl: './select-simple.component.css',
})
export class SelectSimpleComponent extends BaseCreatorComponent {
  columnChange(column: string, index: number) {
    this.query.columnList[index].name = column;
    this.query.columnList[index].alias = column.replace('.', '_');
    this.queryService.updateQuery(this.query);
  }

  aggregateChange(aggregate: string, index: number) {
    this.query.columnList[index].aggregate = aggregate;
    this.query.columnList[index].alias =
      this.query.columnList[index].name.replace('.', '_') +
      '_' +
      aggregate.toLowerCase();
    this.queryService.updateQuery(this.query);
  }

  deleteColumn(index: number) {
    this.query.columnList.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  newColumn() {
    this.query.columnList.push({ name: '', alias: '', aggregate: 'None' });
    this.queryService.updateQuery(this.query);
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true;
    }
    if (
      this.query.columnList.length > 0 &&
      this.query.columnList[this.query.columnList.length - 1].name === ''
    ) {
      return true;
    }
    const fromTableItems = this.fromTable.columnsMetadata.length;
    const joinedTablesItems = this.joinedTables
      .map((table) => table.columnsMetadata.length)
      .reduce((acc, i) => acc + i, 0);
    return this.query.columnList.length === fromTableItems + joinedTablesItems;
  }
}
