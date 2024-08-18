import {Component} from '@angular/core';
import {QueryComponent} from "@app/analytics/query/query.component";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-group-by',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule
  ],
  templateUrl: './group-by.component.html',
  styleUrl: './group-by.component.css'
})
export class GroupByComponent extends QueryComponent {

  groupByChange(column: string, index: number) {
    this.query.groupByList[index] = column
    this.queryService.updateQuery(this.query)
  }

  deleteGroupBy(index: number) {
    this.query.groupByList.splice(index, 1)
    this.queryService.updateQuery(this.query)
  }

  newGroupBy() {
    this.query.groupByList.push(" ")
    this.queryService.updateQuery(this.query)
  }

  buttonDisabled(): boolean {
    if (!this.fromTable) {
      return true
    }
    if (!this.query.columns[0]) {
      return true
    }
    if (this.query.columns[0].name === '') {
      return true
    }
    return false
  }

}
