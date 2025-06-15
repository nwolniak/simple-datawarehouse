import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {AnalyticsService, MetadataService, PivotQueryService, PivotTableExportService} from "@app/_services";
import {QueryViewComponent} from "@app/analytics/query-view/query-view.component";
import {MessageService} from "primeng/api";
import {PivotTableQuery} from "@app/_models";
import {AlertListComponent} from "@app/analytics/analytics-toolbar/alert-list/alert-list.component";

@Component({
  selector: 'app-analytics-toolbar',
  standalone: true,
  imports: [
    Button,
    TooltipModule,
    QueryViewComponent,
    AlertListComponent
  ],
  templateUrl: './analytics-toolbar.component.html',
  styleUrl: './analytics-toolbar.component.css'
})
export class AnalyticsToolBar {


  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService,
    private pivotQueryService: PivotQueryService,
    private pivotTableExportService: PivotTableExportService,
    private messageService: MessageService,
  ) {
  }

  reload() {
    if (!this.metadataService.metadata) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Metadata not loaded'
      })
      return;
    }
    const query: PivotTableQuery = this.pivotQueryService.preparePivotQuery();
    if (!query.hasRequiredSearchData()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please select at least one column.'
      });
      return;
    }
    this.pivotQueryService.sendPivotTableQuery(query);
  }

  clear() {
    this.analyticsService.clear();
    this.pivotQueryService.clear();
    this.metadataService.reset();
  }

  save(): void {
    this.pivotTableExportService.requestExport();
  }
}
