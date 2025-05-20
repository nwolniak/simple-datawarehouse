import {Component} from '@angular/core';
import {PivotTableComponent} from "@app/pivot-table/pivot-table.component";
import {CardModule} from "primeng/card";
import {DragDropModule} from "primeng/dragdrop";
import {DraggablesContainerComponent} from "@app/analytics2/draggables-container/draggables-container.component";
import {ColumnDimSelectorComponent} from "@app/analytics2/column-dim-selector/column-dim-selector.component";
import {RowDimSelectorComponent} from "@app/analytics2/row-dim-selector/row-dim-selector.component";
import {AnalyticsToolBar} from "@app/analytics2/analytics-toolbar/analytics-toolbar.component";
import {AggregateSelectorComponent} from "@app/analytics2/aggregate-selector/aggregate-selector.component";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ToolbarModule} from "primeng/toolbar";
import {AnalyticsService, DragDropService, MetadataService} from "@app/_services";
import {filter} from "rxjs";
import {AggregateDraggable, DimDraggable, Metadata, TableMetadata} from "@app/_models";

@Component({
  selector: 'app-analytics2',
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
  templateUrl: './analytics2.component.html',
  styleUrl: './analytics2.component.css'
})
export class Analytics2Component {

  factTable: TableMetadata | null = null;

  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService) {
    this.metadataService.metadata
      .pipe(
        filter((metadata): metadata is Metadata => !!metadata),
      )
      .subscribe((metadata: Metadata) => {
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
        if (!availableDraggables) {
          const dimDraggables = Array.from(dimTables.values())[0]
            .map(dimTable => new DimDraggable(dimTable));
          const aggregateDraggables = Array.from(factTables.values())[0].columnsMetadata
            .filter(column => ["sub_price", "total_price"].includes(column.name))
            .map(column => new AggregateDraggable(column.name));
          let draggables = [...dimDraggables, ...aggregateDraggables];
          this.analyticsService.setAvailableDraggables(draggables);
          console.log(draggables);
        }
      });
  }

}
