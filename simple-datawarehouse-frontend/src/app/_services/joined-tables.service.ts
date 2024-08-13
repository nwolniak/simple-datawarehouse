import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TableMetadata} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class JoinedTablesService {

  private joinTablesSubject: BehaviorSubject<TableMetadata[]>;
  private readonly _joinedTables: Observable<TableMetadata[]>;

  constructor() {
    this.joinTablesSubject = new BehaviorSubject<TableMetadata[]>([]);
    this._joinedTables = this.joinTablesSubject.asObservable();
  }

  changeJoinedTables(joinedTables: TableMetadata[]): void {
    this.joinTablesSubject.next(joinedTables);
  }

  public get joinedTables(): Observable<TableMetadata[]> {
    return this._joinedTables;
  }

}
