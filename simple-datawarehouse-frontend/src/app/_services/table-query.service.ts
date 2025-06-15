import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Column, OrderBy, Query, Table, TableMetadata} from '@app/_models';
import {environment} from '@environments/environment';
import {BehaviorSubject, filter, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableQueryService {
  private tableMetadataSubject: BehaviorSubject<TableMetadata | null> = new BehaviorSubject<TableMetadata | null>(null);
  tableMetadata$: Observable<TableMetadata | null> = this.tableMetadataSubject.asObservable();

  private querySubject: BehaviorSubject<Query | null> = new BehaviorSubject<Query | null>(null);
  query$: Observable<Query | null> = this.querySubject.asObservable();

  private tableSubject: BehaviorSubject<Table | null> = new BehaviorSubject<Table | null>(null);
  table$: Observable<Table | null> = this.tableSubject.asObservable();

  constructor(private http: HttpClient) {
    this.query$
      .pipe(
        filter((query: Query | null): query is Query => !!query)
      )
      .subscribe((query: Query) => {
        this.getTable(query).subscribe();
      });
  }

  setTableMetadata(tableMetadata: TableMetadata): void {
    this.tableMetadataSubject.next(tableMetadata);
  }

  setQuery(query: Query): void {
    this.querySubject.next(query);
  }

  prepareQuery(tableMetadata: TableMetadata, pageNumber: number, pageSize: number): Query {
    return new Query(
      tableMetadata.columnsMetadata.map(columnMetadata => new Column(columnMetadata.name)),
      tableMetadata.tableName,
      Array.of(),
      Array.of(),
      Array.of(),
      tableMetadata.primaryKeysMetadata.map(primaryKey => new OrderBy(primaryKey.columnName)),
      Array.of(),
      pageNumber,
      pageSize
    );
  }

  private getTable(query: Query): Observable<Table> {
    return this.http.post<Table>(`${environment.tablesUrl}`, query)
      .pipe(
        tap((table: Table) => {
          console.info('Table request success.', table);
          this.tableSubject.next(table);
        })
      );
  }

  clear(): void {
    this.tableSubject.next(null);
  }
}
