import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Query, Table} from "@app/_models";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {AlertService} from "@app/_services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private querySubject: BehaviorSubject<Query>;
  private _query: Observable<Query>;
  private tableSubject: BehaviorSubject<Table | undefined>;
  private _table: Observable<Table | undefined>;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
    let query: Query = {columns: [], fromTable: "", groupByList: [], havingList: [], joins: [], orderByList: []}
    this.querySubject = new BehaviorSubject<Query>(query);
    this._query = this.querySubject.asObservable();
    this.tableSubject = new BehaviorSubject<Table | undefined>(undefined);
    this._table = this.tableSubject.asObservable();
  }

  updateQuery(query: Query): void {
    this.updateAggregates(query)
    this.querySubject.next(query)
    console.log(query)
  }

  private updateAggregates(query: Query): void {
    const aggregates: string[] = []
    query.columns
      .filter(column => column.function !== "")
      .map(column => column.function)
      .forEach(aggregate => aggregates.push(aggregate))
    if (aggregates.length == 0) {
      query.groupByList = []
      return
    }
    console.log(aggregates)
    const aggregatedColumns: string[] = []
    query.columns.forEach(column => aggregatedColumns.push(column.name))
    query.groupByList = aggregatedColumns
  }

  sendQuery() {
    return this.http.post<Table>(`${environment.queryUrl}`, this.querySubject.getValue())
      .pipe(map(table => {
        this.tableSubject.next(table);
        return table;
      }))
      .subscribe({
        next: table => {
          this.tableSubject.next(table);
        },
        error: err => {
          this.alertService.addAlert(err);
        }
      });
  }

  public get table(): Observable<Table | undefined> {
    return this._table;
  }

  public get query(): Observable<Query> {
    return this._query;
  }

}
