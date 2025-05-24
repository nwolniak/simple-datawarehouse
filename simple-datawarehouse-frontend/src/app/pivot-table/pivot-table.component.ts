import {Component} from '@angular/core';
import {PivotTable} from "@app/_models";
import {TableModule} from "primeng/table";
import {KeyValuePipe, SlicePipe} from "@angular/common";
import {LastKeyPipe} from "@app/_pipes";
import {exportQueryResultToCSV, PivotQueryService, PivotTableExportService} from "@app/_services";
import {MessageService} from "primeng/api";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-pivot-table',
  standalone: true,
  imports: [
    TableModule,
    KeyValuePipe,
    SlicePipe,
    LastKeyPipe,
  ],
  templateUrl: './pivot-table.component.html',
  styleUrl: './pivot-table.component.css'
})
export class PivotTableComponent {

  pivotTable: PivotTable | null = null;

  constructor(
    private pivotTableService: PivotQueryService,
    private pivotTableExportService: PivotTableExportService,
    private messageService: MessageService,
  ) {
    this.pivotTableService.pivotTable
      .pipe(takeUntilDestroyed())
      .subscribe((pivotTable: PivotTable | null) => {
          this.pivotTable = pivotTable;
          console.log(this.pivotTable);
        }
      );
    this.pivotTableExportService.exportRequested$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (!this.pivotTable) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'No data available for download. Please run a query first.'}
          );
          return;
        }
        exportQueryResultToCSV(this.pivotTable.queryResult, 'pivot-table-data.csv');
      });
  }

  protected checkRowLabelIsAvailable(key: string, value: string): boolean {
    if (!this.pivotTable) {
      return false;
    }
    let keyValue = key + "=" + value;
    return this.pivotTable.rowLabelMap.has(keyValue);
  }

  protected unsorted = () => 0;

  protected readonly String = String;
}
