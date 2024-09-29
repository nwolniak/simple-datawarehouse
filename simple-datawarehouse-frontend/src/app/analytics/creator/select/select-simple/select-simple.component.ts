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
    this.query.columns[index].name = column;
    this.query.columns[index].alias = column.replace('.', '_');
    this.queryService.updateQuery(this.query);
  }

  aggregateChange(aggregate: string, index: number) {
    this.query.columns[index].function = aggregate;
    this.query.columns[index].alias =
      this.query.columns[index].name.replace('.', '_') +
      '_' +
      aggregate.toLowerCase();
    this.queryService.updateQuery(this.query);
  }

  deleteColumn(index: number) {
    this.query.columns.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  newColumn() {
    this.query.columns.push({ name: '', alias: '', function: '' });
    this.queryService.updateQuery(this.query);
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true;
    }
    if (
      this.query.columns.length > 0 &&
      this.query.columns[this.query.columns.length - 1].name === ''
    ) {
      return true;
    }
    const fromTableItems = this.fromTable.columnsMetadata.length;
    const joinedTablesItems = this.joinedTables
      .map((table) => table.columnsMetadata.length)
      .reduce((acc, i) => acc + i, 0);
    return this.query.columns.length === fromTableItems + joinedTablesItems;
  }
}
