import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BaseCreatorComponent } from '@app/analytics/creator/base-creator/base-creator.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    PaginatorModule,
  ],
  templateUrl: './select-advanced.component.html',
  styleUrl: './select-advanced.component.css',
})
export class SelectAdvancedComponent extends BaseCreatorComponent {
  columnChange(column: string, index: number) {
    this.query.columnList[index].name = column;
    this.queryService.updateQuery(this.query);
  }

  aliasChange($event: Event, index: number) {
    this.query.columnList[index].alias = ($event.target as HTMLInputElement).value;
    this.queryService.updateQuery(this.query);
  }

  aggregateChange(aggregate: string, index: number) {
    this.query.columnList[index].aggregate = aggregate;
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
    if (this.query.columnList.length === fromTableItems + joinedTablesItems) {
      return true;
    }
    return false;
  }
}
