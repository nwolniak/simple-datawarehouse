import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private tableSubject: BehaviorSubject<Table | undefined>;
  private readonly _table: Observable<Table | undefined>;

  constructor(private http: HttpClient) {
    this.tableSubject = new BehaviorSubject<Table | undefined>(undefined);
    this._table = this.tableSubject.asObservable();
  }

  public get table(): Observable<Table | undefined> {
    return this._table;
  }

  getTable(name: string): Observable<Table> {
    console.log(environment.production)
    return this.http.get<Table>(`${environment.tablesUrl}/${name}`).pipe(
      map((table) => {
        this.tableSubject.next(table);
        return table;
      }),
    );
  }
}
