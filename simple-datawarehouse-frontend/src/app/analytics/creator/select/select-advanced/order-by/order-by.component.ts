import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BaseCreatorComponent } from '@app/analytics/creator/base-creator/base-creator.component';

@Component({
  selector: 'app-order-by',
  standalone: true,
  imports: [TableModule, PaginatorModule, ToggleButtonModule],
  templateUrl: './order-by.component.html',
  styleUrl: './order-by.component.css',
})
export class OrderByComponent extends BaseCreatorComponent {
  orderByColumnChange(column: string, index: number) {
    this.query.orderByList[index].columnName = column;
    this.queryService.updateQuery(this.query);
  }

  newOrderBy() {
    this.query.orderByList.push({ columnName: '', ascending: true });
    this.queryService.updateQuery(this.query);
  }

  deleteOrderBy(index: number) {
    this.query.orderByList.splice(index, 1);
    this.queryService.updateQuery(this.query);
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true;
    }
    if (!this.query.columns[0]) {
      return true;
    }
    if (this.query.columns[0].name === '') {
      return true;
    }
    return false;
  }
}
