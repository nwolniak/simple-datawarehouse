import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {PivotQueryService} from "@app/_services";
import {PivotTable} from "@app/_models";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-query-view',
  standalone: true,
  imports: [
    Button,
    DataViewModule,
    DialogModule,
    ToolbarModule
  ],
  templateUrl: './query-view.component.html',
  styleUrl: './query-view.component.css'
})
export class QueryViewComponent {

  sql: string = "";
  visible: boolean = false;

  constructor(
    private pivotQueryService: PivotQueryService,
    private messageService: MessageService,
  ) {
    this.pivotQueryService.pivotTable$
      .subscribe((pivotTable: PivotTable | null) => {
          if (!pivotTable) {
            this.sql = "";
          } else {
            this.sql = pivotTable.queryResult.sql;
          }
        }
      )
  }

  showQuery() {
    if (this.sql.length == 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No query selected'
      })
      return;
    }
    this.visible = true;
  }

}
