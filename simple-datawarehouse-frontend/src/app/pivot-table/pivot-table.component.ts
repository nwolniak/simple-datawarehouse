import {Component, OnInit} from '@angular/core';
import {PivotTable, PivotTableQuery} from "@app/_models";
import {TableModule} from "primeng/table";
import {KeyValuePipe, SlicePipe} from "@angular/common";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "@environments/environment";
import {catchError, tap, throwError} from "rxjs";
import {LastKeyPipe} from "@app/_pipes";

@Component({
  selector: 'app-pivot-table',
  standalone: true,
  imports: [
    TableModule,
    KeyValuePipe,
    SlicePipe,
    LastKeyPipe
  ],
  templateUrl: './pivot-table.component.html',
  styleUrl: './pivot-table.component.css'
})
export class PivotTableComponent implements OnInit {

  rowLabelMap: Map<string, any> = new Map([
    ["year", "1"],
    ["quarter", "2"],
    ["region", "3"]
  ])
  pivotTable!: PivotTable;

  pivotTableQuery: PivotTableQuery = {
    rowLabels: ["year", "quarter", "region"],
    columnLabels: ["category", "product"],
    valueLabels: ["sales", "discount"],
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.post<PivotTable>(`${environment.queryPivotDataUrl}`, this.pivotTableQuery)
      .pipe(
        tap(() => console.info('PivotTableQuery request success.')),
        catchError((error: HttpErrorResponse) => {
          console.error('PivotTableQuery request error:', error.error);
          return throwError(() => error);
        }))
      .subscribe({
        next: (table: PivotTable) => {
          this.pivotTable = table;
          this.pivotTable.rowLabelMap = new Map(Object.entries(this.pivotTable.rowLabelMap));
          console.log(this.pivotTable);
        },
        error: (error: HttpErrorResponse) => {
          // this.alertService.addAlert(error.error);
        },
      });
  }

  checkRowLabelIsAvailable(key: string, value: string): boolean {
    let keyValue = key + "=" + value;
    return this.pivotTable.rowLabelMap.has(keyValue);
  }
  getRowLabelSize(key: string, value: string): number {
    let keyValue = key + "=" + value;
    let result: number = this.pivotTable.rowLabelMap.get(keyValue)!;
    console.log(keyValue + " -> " + result)
    return result;
  }

  unsorted = () => 0;

  protected readonly String = String;
}
