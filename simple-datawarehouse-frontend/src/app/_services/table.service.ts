import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Table} from "@app/_models";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {
  }

  getTable(name: string): Observable<Table> {
    return this.http.get<Table>(`${environment.tablesUrl}/${name}`);
  }

}
