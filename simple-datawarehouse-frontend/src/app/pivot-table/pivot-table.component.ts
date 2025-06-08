import {AfterViewInit, Component, OnDestroy, ViewContainerRef} from '@angular/core';
import {PivotTable} from "@app/_models";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
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
  // rowsBuffered: number = 20;
  // firstIndexResettable: number = 0;
  // tableIsReady: boolean = false;

  pivotTable: PivotTable | null = null;
  // virtualRowsPivoted!: Map<string, any>[];
  // virtualRowsNotPivoted!: Map<string, any>[];

  constructor(
    private host: ViewContainerRef,
    private pivotTableService: PivotQueryService,
    private pivotTableExportService: PivotTableExportService,
    private messageService: MessageService,
  ) {
    this.pivotTableService.pivotTable
      .pipe(takeUntilDestroyed())
      .subscribe((pivotTable: PivotTable | null) => {
          this.pivotTable = pivotTable;
          if (!this.pivotTable) {
            return;
          }
          // if (this.pivotTable.isPivoted) {
          //   const rowsPivotedLength = this.pivotTable.rowList.length;
          //   this.virtualRowsPivoted = Array.from({length: rowsPivotedLength});
          //   this.lazyLoadPivoted({first: 0, rows: this.rowsBuffered})
          // } else {
          //   const rowsNotPivotedLength = this.pivotTable.queryResult.rowList.length;
          //   this.virtualRowsNotPivoted = Array.from({length: rowsNotPivotedLength});
          //   this.lazyLoadNotPivoted({first: 0, rows: this.rowsBuffered})
          // }
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
              detail: 'No data available for download. Please run a query first.'
            }
          );
          return;
        }
        exportQueryResultToCSV(this.pivotTable.queryResult, 'pivot-table-data.csv');
      });

  }

  ngAfterViewInit(): void {
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

  // lazyLoadPivoted(event: TableLazyLoadEvent) {
  //   setTimeout(() => {
  //     if (!this.pivotTable) {
  //       return;
  //     }
  //     const first = event.first ?? 0;
  //     const rows = event.rows ?? this.rowsBuffered;
  //     let loadedRows = this.pivotTable.rowList.slice(first, first + rows);
  //     Array.prototype.splice.apply(this.virtualRowsPivoted, [first, rows, ...loadedRows]);
  //   }, 200);
  // }
  //
  // lazyLoadNotPivoted(event: TableLazyLoadEvent) {
  //   setTimeout(() => {
  //     if (!this.pivotTable) {
  //       return;
  //     }
  //     const first = event.first ?? 0;
  //     const rows = event.rows ?? this.rowsBuffered;
  //     let loadedRows = this.pivotTable.queryResult.rowList.slice(first, first + rows);
  //     Array.prototype.splice.apply(this.virtualRowsNotPivoted, [first, rows, ...loadedRows]);
  //   }, 200);
  // }

  protected unsorted = () => 0;

  protected readonly String = String;
}
