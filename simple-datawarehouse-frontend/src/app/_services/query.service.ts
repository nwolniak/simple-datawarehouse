import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Query, Table} from "@app/_models";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private querySubject: BehaviorSubject<Query>;
  private _query: Observable<Query>;
  private tableSubject: BehaviorSubject<Table | undefined>;
  private _table: Observable<Table | undefined>;

  constructor(private http: HttpClient) {
    let query: Query = {columns: [], fromTable: "", groupByList: [], havingList: [], joins: [], orderByList: []}
    this.querySubject = new BehaviorSubject<Query>(query);
    this._query = this.querySubject.asObservable();
    this.tableSubject = new BehaviorSubject<Table | undefined>(undefined);
    this._table = this.tableSubject.asObservable();
  }

  updateQuery(query: Query): void {
    this.querySubject.next(query);
    console.log(query)
  }

  sendQuery(): Observable<Table> {
    return this.http.post<Table>(`${environment.queryUrl}`, this.querySubject.value)
      .pipe(map(table => {
        this.tableSubject.next(table);
        return table;
      }));
  }

  public get table(): Observable<Table | undefined> {
    return this._table;
  }

  public get query(): Observable<Query> {
    return this._query;
  }

}
