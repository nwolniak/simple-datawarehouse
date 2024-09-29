import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Query, Table } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private querySubject: BehaviorSubject<Query>;
  private readonly _query: Observable<Query>;
  private tableQuerySubject: BehaviorSubject<Query>;
  private readonly _tableQuery: Observable<Query>;
  private tableSubject: BehaviorSubject<Table>;
  private readonly _table: Observable<Table>;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    let query: Query = {
      columns: [],
      fromTable: '',
      groupByList: [],
      havingList: [],
      joins: [],
      orderByList: [],
      whereList: [],
    };
    this.querySubject = new BehaviorSubject<Query>(query);
    this._query = this.querySubject.asObservable();
    let tableQuery: Query = {
      columns: [],
      fromTable: '',
      groupByList: [],
      havingList: [],
      joins: [],
      orderByList: [],
      whereList: [],
    };
    this.tableQuerySubject = new BehaviorSubject<Query>(tableQuery);
    this._tableQuery = this.tableQuerySubject.asObservable();
    let table: Table = {
      tableName: '',
      columns: [],
      rows: [{ 'not selected': '' }],
      columnOptions: [],
      selectedColumns: [],
      selectedRows: [],
      query: '',
    };
    this.tableSubject = new BehaviorSubject<Table>(table);
    this._table = this.tableSubject.asObservable();
  }

  public get table(): Observable<Table> {
    return this._table;
  }

  public get query(): Observable<Query> {
    return this._query;
  }

  public get tableQuery(): Observable<Query> {
    return this._tableQuery;
  }

  updateQuery(query: Query): void {
    this.updateAggregates(query);
    this.querySubject.next(query);
  }

  updateTableQuery(query: Query): void {
    this.updateAggregates(query);
    this.tableQuerySubject.next(query);
  }

  sendQuery() {
    return this.http
      .post<Table>(`${environment.queryUrl}`, this.querySubject.getValue())
      .subscribe({
        next: (table) => {
          this.tableSubject.next(table);
        },
        error: (err) => {
          this.alertService.addAlert(err);
        },
      });
  }

  sendTableQuery() {
    return this.http
      .post<Table>(`${environment.queryUrl}`, this.tableQuerySubject.getValue())
      .subscribe({
        next: (table) => {
          this.tableSubject.next(table);
        },
        error: (err) => {
          this.alertService.addAlert(err);
        },
      });
  }

  private updateAggregates(query: Query): void {
    const aggregates: string[] = [];
    query.columns
      .filter((column) => column.function !== '')
      .map((column) => column.function)
      .forEach((aggregate) => aggregates.push(aggregate));
    if (aggregates.length == 0) {
      query.groupByList = [];
      return;
    }
    console.log(aggregates);
    const aggregatedColumns: string[] = [];
    query.columns.forEach((column) => aggregatedColumns.push(column.name));
    query.groupByList = aggregatedColumns;
  }
}
