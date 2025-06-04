import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {QueryResult} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class PivotTableExportService {

  private exportSubject = new Subject<void>();
  exportRequested$ = this.exportSubject.asObservable();

  requestExport() {
    this.exportSubject.next();
  }

}

export function exportQueryResultToCSV(result: QueryResult, filename: string = 'export.csv'): void {
  if (!result) {
    return;
  }
  const csv: string[] = Array.of();
  //header
  csv.push(result.columnList.join(','));
  //rows
  for (const row of result.rowList) {
    const rowValues: string[] = result.columnList.map(colum => row.get(colum));
    csv.push(rowValues.join(','));
  }
  const csvContent = csv.join(';\n');
  const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
