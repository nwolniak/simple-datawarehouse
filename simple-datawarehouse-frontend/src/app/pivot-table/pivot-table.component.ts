import {AfterViewInit, Component, OnDestroy, ViewContainerRef} from '@angular/core';
import {PivotTable} from "@app/_models";
import {TableModule} from "primeng/table";
import {KeyValuePipe, SlicePipe} from "@angular/common";
import {LastKeyPipe} from "@app/_pipes";
import {exportQueryResultToCSV, PivotQueryService, PivotTableExportService} from "@app/_services";
import {MessageService} from "primeng/api";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-pivot-table',
  standalone: true,
  imports: [
    TableModule,
    KeyValuePipe,
    SlicePipe,
    LastKeyPipe,
    SkeletonModule,

  ],
  templateUrl: './pivot-table.component.html',
  styleUrl: './pivot-table.component.css'
})
export class PivotTableComponent implements AfterViewInit, OnDestroy {

  scrollHeight: string = '400px';
  private resizeObserver!: ResizeObserver;
  pivotTable: PivotTable | null = null;

  constructor(
    private host: ViewContainerRef,
    private pivotTableService: PivotQueryService,
    private pivotTableExportService: PivotTableExportService,
    private messageService: MessageService,
  ) {
    this.pivotTableService.pivotTable$
      .pipe(takeUntilDestroyed())
      .subscribe((pivotTable: PivotTable | null) => {
          this.pivotTable = pivotTable;
          if (!this.pivotTable) {
            return;
          }
        }
      );
    this.pivotTableExportService.exportRequested$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (!this.pivotTable) {
          this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'No data available for download. Please run a query first.'
            }
          );
          return;
        }
        if (this.pivotTable.isPivoted) {
          exportQueryResultToCSV(this.pivotTable.queryResult, 'pivot-table-data.csv');
        } else {
          exportQueryResultToCSV(this.pivotTable.queryResult, 'table-data.csv');
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateScrollHeight(), 200);
    this.resizeObserver = new ResizeObserver(() => this.updateScrollHeight());
    this.resizeObserver.observe(this.host.element.nativeElement);
    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateScrollHeight() {
    const offsetTop = this.host.element.nativeElement.getBoundingClientRect().top;
    const availableHeight = window.innerHeight - offsetTop - 1;
    this.scrollHeight = `${availableHeight}px`;
  }

  protected unsorted = () => 0;

  protected readonly String = String;
}
