import { Injectable } from '@angular/core';
import { TableService } from '@app/_services/table.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { TableRow } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  private datasourceSubject: BehaviorSubject<
    MatTableDataSource<TableRow> | undefined
  >;
  private readonly _datasource: Observable<
    MatTableDataSource<TableRow> | undefined
  >;

  constructor(private tableService: TableService) {
    this.datasourceSubject = new BehaviorSubject<
      MatTableDataSource<TableRow> | undefined
    >(undefined);
    this._datasource = this.datasourceSubject.asObservable();
  }

  public get datasource(): Observable<
    MatTableDataSource<TableRow> | undefined
  > {
    return this._datasource;
  }

  getDatasource(name: string): Observable<MatTableDataSource<TableRow>> {
    return this.tableService.getTable(name).pipe(
      map((table) => {
        const datasource = new MatTableDataSource(table.rows);
        this.datasourceSubject.next(datasource);
        return datasource;
      }),
    );
  }
}
