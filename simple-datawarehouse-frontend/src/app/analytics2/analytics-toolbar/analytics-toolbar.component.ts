import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {AlertListComponent} from "@app/analytics/table/alert-list/alert-list.component";
import {TooltipModule} from "primeng/tooltip";
import {Table as PrimeNGTable} from "primeng/table/table";
import {ExportCSVOptions} from "primeng/table";
import {AnalyticsService, PivotQueryService, QueryService} from "@app/_services";

@Component({
  selector: 'app-analytics-toolbar',
  standalone: true,
  imports: [
    Button,
    AlertListComponent,
    TooltipModule
  ],
  templateUrl: './analytics-toolbar.component.html',
  styleUrl: './analytics-toolbar.component.css'
})
export class AnalyticsToolBar {


  constructor(
    private analyticsService: AnalyticsService,
    private pivotQueryService: PivotQueryService
  ) {
  }

  reload() {
    this.pivotQueryService.sendPivotTableQuery();
  }

  clear() {
  }

  save(dt: PrimeNGTable, options: ExportCSVOptions): void {
  }
}
