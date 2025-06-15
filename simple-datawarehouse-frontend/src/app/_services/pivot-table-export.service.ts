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
  const columnList: string[] = Object.values(result.columnList);
  for (const row of result.rowList) {
    const rowMap = new Map<string, any>(Object.entries(row));
    const rowValues: string[] = columnList.map(colum => rowMap.get(colum));
    csv.push(rowValues.join(','));
  }
  const csvContent = csv.join(';\n');
  const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
