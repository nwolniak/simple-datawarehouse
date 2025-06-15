import {Component} from '@angular/core';
import {PivotTableComponent} from "@app/pivot-table/pivot-table.component";
import {CardModule} from "primeng/card";
import {DragDropModule} from "primeng/dragdrop";
import {DraggablesContainerComponent} from "@app/analytics/draggables-container/draggables-container.component";
import {ColumnDimSelectorComponent} from "@app/analytics/column-dim-selector/column-dim-selector.component";
import {RowDimSelectorComponent} from "@app/analytics/row-dim-selector/row-dim-selector.component";
import {AnalyticsToolBar} from "@app/analytics/analytics-toolbar/analytics-toolbar.component";
import {AggregateSelectorComponent} from "@app/analytics/aggregate-selector/aggregate-selector.component";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ToolbarModule} from "primeng/toolbar";
import {AnalyticsService, MetadataService} from "@app/_services";
import {filter} from "rxjs";
import {
  AggregateDraggable,
  ColumnMetadata,
  ColumnSelectable,
  DimDraggable,
  Metadata,
  TableMetadata
} from "@app/_models";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    PivotTableComponent,
    CardModule,
    DragDropModule,
    DraggablesContainerComponent,
    ColumnDimSelectorComponent,
    RowDimSelectorComponent,
    AnalyticsToolBar,
    AggregateSelectorComponent,
    ScrollPanelModule,
    ToolbarModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  factTable: TableMetadata | null = null;

  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService) {
    this.metadataService.metadata$
      .pipe(
        filter((metadata): metadata is Metadata => !!metadata),
      )
      .subscribe((metadata: Metadata) => {
        if (metadata.factTables.length === 0) {
          return;
        }
        //TODO add possibility to choose FactTable
        const dimTables = new Map<string, TableMetadata[]>(Object.entries(metadata.dimTables));
        const factTables = metadata.factTables;

        const factTable = this.analyticsService.getFactTable();
        if (factTable) {
          this.factTable = factTable;
        } else {
          this.analyticsService.setFactTable(factTables[0]);
        }

        const availableDraggables = this.analyticsService.getAvailableDraggables();
        if (availableDraggables.length === 0) {
          const dimDraggables = Array.from(dimTables.values())[0]
            .map(dimTable => new DimDraggable(
              dimTable,
              dimTable.tableName,
              dimTable.columnsMetadata.map(column => new ColumnSelectable(column.name, column.type)))
            );
          const aggregateDraggables = Array.from(factTables.values())[0].columnsMetadata
            .filter((column: ColumnMetadata) => column.isAggregate)
            .map(column => new AggregateDraggable(column.name));
          let draggables = [...dimDraggables, ...aggregateDraggables];
          this.analyticsService.setAvailableDraggables(draggables);
        }
      });
  }

}
